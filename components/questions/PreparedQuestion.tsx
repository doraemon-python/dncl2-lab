import Link from "next/link";
import { motion } from "framer-motion";
type Props = {
  href: string;
  title: string;
  children: React.ReactNode;
}

const PreparedQuestion = ({ href, title, children }: Props) => {
  return (
    <div>
      <motion.div className="bg-3 rounded-xl p-2 hover:bg-gray-300 flex hover:scale-[1.01] duration-300 ease-out"
        whileTap={{
          scaleX: 0.97,
          backgroundColor: "rgb(165, 165, 165)"
        }}
        transition={{ duration: 0.3 }}>
        <Link href={href} className="flex">
          {children}
          {title}
        </Link>
      </motion.div>
    </div>
  )
}

export default PreparedQuestion;