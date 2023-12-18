"use client"
import AppTitle from "@/components/home/AppTitle";
import CreatedPrograms from "@/components/home/CreatedPrograms";
import Link from "next/link";
import { motion } from "framer-motion";


const Page = () => {
  return (
    <>
      {/* <Image className='scale-[2.00] fixed left-20 top-[10%] -z-10 ' alt='' src={"/example1.gif"} height={50} width={50} /> */}
      <div className=" z-10 p-4 min-h-[100svh] flex flex-col justify-between max-w-xl mx-auto">
        <AppTitle />
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [110, -10, 0] }}
            transition={{ duration: 0.9 }}>
            <Link href={"/introduction"} className="flex justify-center gap-2 w-full mb-4 py-2 text-center bg-2 rounded-xl shadow-md">
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox="0 0 24 24"><g fill='none' fill-rule='nonzero'><path d='M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z' /><path fill='#007AFFFF' d='M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm-.01 8H11a1 1 0 0 0-.117 1.993L11 12v4.99c0 .52.394.95.9 1.004l.11.006h.49a1 1 0 0 0 .596-1.803L13 16.134V11.01c0-.52-.394-.95-.9-1.004L11.99 10ZM12 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z' /></g></svg>
              DNCL2について
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [130, -10, 0] }}
            transition={{ duration: 1.1 }}>
            <Link href={"/questions"} className="flex gap-4 justify-center w-full mb-4 py-2 text-center bg-2 rounded-xl shadow-md">
              <svg className="" xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox="0 0 24 24"><g fill='none' fill-rule='nonzero'><path d='M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z' /><path fill='#007AFFFF' d='M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm0 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm0-9.5a3.625 3.625 0 0 0-3.625 3.625 1 1 0 1 0 2 0 1.625 1.625 0 1 1 2.23 1.51c-.676.27-1.605.962-1.605 2.115V14a1 1 0 1 0 2 0c0-.244.05-.366.261-.47l.087-.04A3.626 3.626 0 0 0 12 6.5Z' /></g></svg>
              問題を解く
            </Link>
          </motion.div>
        </div>
        <CreatedPrograms />
        <div className="">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [150, -10, 0] }}
            transition={{ duration: 1.5 }}>
            <Link href={"/editor"} className="shadow-md p-2 text-white rounded-xl text-center block mx-auto w-full bg-main hover:bg-main-hover">プログラムを作成</Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Page;