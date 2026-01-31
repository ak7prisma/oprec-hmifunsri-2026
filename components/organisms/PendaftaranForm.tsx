"use client";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { addDoc, collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "../ui/use-toast";
import { useEffect } from "react";
import React from "react";
import { UploadCloud } from "lucide-react";

const MAX_FILE_SIZE = 4000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const FormSchema = z.object({
  name: z.string().min(1, { message: "Nama tidak boleh kosong" }),
  nim: z.coerce
    .string()
    .regex(/^[0-9]*$/, { message: "NIM harus berupa angka" })
    .min(1, { message: "NIM tidak boleh kosong" }),
  email: z.string({ required_error: "Email tidak boleh kosong" }).email({ message: "Masukkan email yang valid" }),
  generation: z.string().min(1, "Angkatan tidak boleh kosong"),
  class: z.string().min(1, "Kelas tidak boleh kosong"),
  campusDomicile: z.string().min(1, { message: "Domisili Kampus tidak boleh kosong" }),
  address: z.string().min(1, { message: "Alamat tidak boleh kosong" }),
  whatsappNumber: z.coerce
    .string()
    .regex(/^[0-9]*$/, { message: "No Whatsapp harus berupa angka" })
    .min(1, { message: "No Whatsapp tidak boleh kosong" }),
  idLine: z.string().min(1, { message: "ID Line tidak boleh kosong" }),
  linkTwibbon: z.string().min(1, { message: "Link Twibbon tidak boleh kosong" }),
  divisions: z.string().array().min(2, { message: "Field ini tidak boleh kosong" }),
  reasonHMIF: z.string().min(1, { message: "Alasan Bergabung HMIF tidak boleh kosong" }),
  reasonDivision1: z.string().min(1, { message: "Field ini tidak boleh kosong" }),
  reasonDivision2: z.string().min(1, { message: "Field ini tidak boleh kosong" }),
  kpm: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Ukuran File terlalu besar.`)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), "Mohon upload file berformat .jpg, .jpeg, .png and .webp"),
  isAgree: z.boolean(),
});

export default function PendaftaranForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address: "",
      campusDomicile: "",
      class: "",
      divisions: [],
      email: "",
      generation: "",
      idLine: "",
      isAgree: false,
      linkTwibbon: "",
      name: "",
      nim: "",
      reasonDivision1: "",
      reasonDivision2: "",
      reasonHMIF: "",
      whatsappNumber: "",
      kpm: null,
    },
  });

  useEffect(() => {
 
    toast({
      title: "Pendafataran belum dibuka",
      description: "Mohon maaf pendaftaran OPREC HMIF UNSRI 2026 belum dibuka, sabar gess!!",
    });
    router.push("/");
    
   }, []);

  const router = useRouter();

  const onSubmit = async (formValues: z.infer<typeof FormSchema>) => {
    // Persiapan Data
    const collectionRef = collection(db, "calonStaff");
    const { 
      address, campusDomicile, class: classStudent, divisions, email, 
      generation, idLine, isAgree, linkTwibbon, name, nim, 
      reasonDivision1, reasonDivision2, reasonHMIF, whatsappNumber, kpm 
    } = formValues;

    // Validasi NIM
    const q = query(collectionRef, where("nim", "==", nim));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      toast({
        variant: "destructive",
        title: "NIM sudah terdaftar",
        description: "NIM ini sudah ada di database.",
      });
      return;
    }

    try {
      // Upload ke Cloudinary
      if (!kpm) {
        throw new Error("File Bukti KPM wajib diupload!");
      }

      const formData = new FormData();
      formData.append("file", kpm);
      formData.append("upload_preset", "kpm_oprec_hmif"); 

      const cloudName = "dfgyrd6nf"; 

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, 
        {
          method: "POST",
          body: formData,
        }
      );
      
      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        console.error("Cloudinary Error:", uploadData);
        throw new Error(uploadData.error?.message || "Gagal upload ke Cloudinary");
      }

      const finalImageUrl = uploadData.secure_url;
      console.log("Status Upload Berhasil:", finalImageUrl);

      // Simpan Data
      await addDoc(collectionRef, {
        address,
        campusDomicile,
        classStudent,
        divisions,
        email,
        generation,
        idLine,
        isAgree,
        linkTwibbon: linkTwibbon ?? null,
        name,
        nim,
        reasonDivision1,
        reasonDivision2: reasonDivision2 ?? null,
        reasonHMIF,
        whatsappNumber,
        
        kpm: finalImageUrl, 
        
        status: "Ditolak",
        acceptedDivision: "Ditolak",
        createdAt: new Date(),
      });

      router.push("/daftar/sukses");

    } catch (error: any) {
      console.error("Error upload:", error);
      toast({
        variant: "destructive",
        title: "Gagal Mendaftar",
        description: error.message || "Terjadi kesalahan sistem. Coba lagi.",
      });
    }
  };

  const [dragActive, setDragActive] = React.useState(false);
  const [paymentProofPreview, setPaymentProofPreview] = React.useState<string | null>(null);
  const inputId = "kpm-upload-input";

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    form.setValue("kpm", file ?? null);
  };

  const kpmValue = form.watch("kpm");

  React.useEffect(() => {
    if (kpmValue instanceof File) {
      const objectUrl = URL.createObjectURL(kpmValue);
      setPaymentProofPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPaymentProofPreview(null);
    }
  }, [kpmValue]);

  const handleDragActive = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      form.setValue("kpm", e.dataTransfer.files[0]);
    }
  };

  const onRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.setValue("kpm", null);
    setPaymentProofPreview(null);
  };

  return (
    <div className="flex flex-col">
      <div className="px-3 py-10 rounded-lg lg:px-6 form-pendaftaran-box">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <p className="mx-auto text-2xl font-semibold text-center text-slate-700">Biodata Diri</p>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama lengkap" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nim"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Induk Mahasiswa</FormLabel>
                  <FormControl>
                    <Input placeholder="Nomor induk mahasiswa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="generation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Angkatan</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih angkatan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="class"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kelas</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kelas" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Reguler A">Reguler A</SelectItem>
                      <SelectItem value="Reguler B">Reguler B</SelectItem>
                      <SelectItem value="Reguler C">Reguler C</SelectItem>
                      <SelectItem value="Bilingual A">Bilingual A</SelectItem>
                      <SelectItem value="Bilingual B">Bilingual B</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="campusDomicile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domisili Kampus</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih domisili kampus" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Indralaya">Indralaya</SelectItem>
                      <SelectItem value="Palembang">Palembang</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat Lengkap</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Masukkan alamat lengkap" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="whatsappNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Whatsapp</FormLabel>
                  <FormControl>
                    <Input placeholder="xxxx-xxxx-xxxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="idLine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID Line</FormLabel>
                  <FormControl>
                    <Input placeholder="ID line" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="mt-4 mb-2 text-2xl font-medium lg:mt-8 lg:mb-4 text-center text-slate-700">Pemilihan Divisi</p>

            <FormField
              control={form.control}
              name="divisions.0"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Divisi 1</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih divisi 1" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Administrasi">Administrasi</SelectItem>
                      <SelectItem value="Akademik - PIP">Akademik - Pengembangan Ilmu Pengetahuan</SelectItem>
                      <SelectItem value="Akademik - PTI">Akademik - Pengembangan Teknologi Informasi</SelectItem>
                      <SelectItem value="Kastrad - ADKAM">Kajian Strategi dan Advokasi - Advokasi dan Kesejahteraan Mahasiswa</SelectItem>
                      <SelectItem value="Kastrad - POLPRO">Kajian Strategi dan Advokasi - Politik dan Propaganda</SelectItem>
                      <SelectItem value="KWU">Kewirausahaan</SelectItem>
                      <SelectItem value="KOMINFO - HUMAS">Komunikasi dan Informasi - Hubungan Masyarakat</SelectItem>
                      <SelectItem value="KOMINFO - MULMED">Komunikasi dan Informasi - Multimedia</SelectItem>
                      <SelectItem value="PMB - Olahraga">Pengembangan Minat dan Bakat - Olahraga</SelectItem>
                      <SelectItem value="PMB - Seni">Pengembangan Minat dan Bakat - Seni</SelectItem>
                      <SelectItem value="PSDM">Pengembangan Sumber Daya Manusia</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="divisions.1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Divisi 2</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih divisi 2" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Administrasi">Administrasi</SelectItem>
                      <SelectItem value="Akademik - PIP">Akademik - Pengembangan Ilmu Pengetahuan</SelectItem>
                      <SelectItem value="Akademik - PTI">Akademik - Pengembangan Teknologi Informasi</SelectItem>
                      <SelectItem value="Kastrad - ADKAM">Kajian Strategi dan Advokasi - Advokasi dan Kesejahteraan Mahasiswa</SelectItem>
                      <SelectItem value="Kastrad - POLPRO">Kajian Strategi dan Advokasi - Politik dan Propaganda</SelectItem>
                      <SelectItem value="KWU">Kewirausahaan</SelectItem>
                      <SelectItem value="KOMINFO - HUMAS">Komunikasi dan Informasi - Hubungan Masyarakat</SelectItem>
                      <SelectItem value="KOMINFO - MULMED">Komunikasi dan Informasi - Multimedia</SelectItem>
                      <SelectItem value="PMB - Olahraga">Pengembangan Minat dan Bakat - Olahraga</SelectItem>
                      <SelectItem value="PMB - Seni">Pengembangan Minat dan Bakat - Seni</SelectItem>
                      <SelectItem value="PSDM">Pengembangan Sumber Daya Manusia</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reasonHMIF"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alasan bergabung HMIF</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Mengapa kamu ingin bergabung dengan HMIF?" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reasonDivision1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alasan memilih Divisi 1</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Mengapa memilih divisi ini?" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reasonDivision2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alasan memilih Divisi 2</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Mengapa memilih divisi ini?" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="mt-4 text-2xl font-medium lg:mt-8 text-center text-slate-700">Bukti Persyaratan</p>

            <FormField
              control={form.control}
              name="linkTwibbon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twibbon</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Link Feed Twibbon di Instagram" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="">
              {" "}
              <p className="text-lg text-slate-500">
                Link postingan Instagram upload twibbon. Link :{" "}
                <a href="https://bit.ly/twibbonoprechmifunsri2026" target="_blank" className="text-sky-500">
                  Twibbon OPREC HMIF 2026
                </a>
              </p>
              <p className="text-lg text-slate-500">Note : Akun IG jangan di private dan jangan lupa tag IG @hmif.unsri</p>
            </div>

            <FormField
              control={form.control}
              name="kpm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-semibold">
                    Kartu Pengenal Mahasiswa (KPM)
                  </FormLabel>
                  <FormControl>
                    <label
                      htmlFor={inputId}
                      onDragEnter={handleDragActive}
                      onDragOver={handleDragActive}
                      onDragLeave={onDragLeave}
                      onDrop={onDrop}
                      className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 
                        ${
                          dragActive
                            ? "border-pink-500 bg-pink-50 ring-2 ring-pink-200/50"
                            : "border-slate-300 bg-slate-50 hover:bg-white hover:border-pink-400 hover:shadow-sm"
                        }`}
                    >
                      {paymentProofPreview ? (
                        <div className="relative w-full h-full rounded-xl overflow-hidden p-2">
                          <img
                            src={paymentProofPreview}
                            alt="Preview bukti pembayaran"
                            className="object-contain w-full h-full rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={onRemove}
                            className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md transition-transform hover:scale-110"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <UploadCloud className="w-10 h-10 text-pink-400 mb-3" />
                          <p className="mb-2 text-sm text-slate-500">
                            <span className="font-bold text-pink-500">
                              Klik untuk upload
                            </span>{" "}
                            atau drag & drop
                          </p>
                          <p className="text-xs text-slate-400">
                            PNG, JPG atau JPEG (MAX. 4MB)
                          </p>
                        </div>
                      )}
                      <input
                        id={inputId}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => onFileChange(e)}
                      />
                    </label>
                  </FormControl>
                  <FormMessage className="text-pink-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isAgree"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3">
                  <FormControl>
                    <Checkbox className="mt-2 border-2 border-pink-600" checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>

                  <FormLabel className={`font-normal text-sm lg:text-lg  ${form.formState.errors.isAgree && "text-red-500"}`}>
                    Saya sudah membaca persyaratan dan menerima untuk mengikuti semua rangkaian acara pendaftaran staff HMIF UNSRI.
                  </FormLabel>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-2 mx-auto text-lg uppercase md:w-1/2 lg:w-1/4 button-submit" disabled={form.formState.isSubmitting}>
              Kirim
              {form.formState.isSubmitting && <AiOutlineLoading3Quarters className="ml-2 animate-spin" />}
            </Button>
          </form>
          {/* <div className="absolute z-[5000]">
            <NoSSR>
              <DevTool control={form.control} placement="bottom-right" />
            </NoSSR>
          </div> */}
        </Form>
      </div>
    </div>
  );
}
