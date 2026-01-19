import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type MobileMenuProps = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  links: { name: string; href: string }[];
};

export default function MobileMenu({ isOpen, setIsOpen, links }: Readonly<MobileMenuProps>) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 overflow-hidden absolute top-full left-0 right-0 shadow-lg"
        >
          <div className="flex flex-col p-6 space-y-4">
            
            {/* Navigation */}
            <div className="flex flex-col space-y-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-slate-600 hover:text-pink-600 hover:bg-pink-100 hover:pl-4 transition-all duration-300 py-3 px-2 rounded-t-lg rounded-r-lg font-medium text-base border-b border-slate-100 last:border-0"
                >
                  {link.name}
                </Link>
              ))}
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}