'use client'
import React, { FormEvent, Fragment, useState } from 'react';
import Button from '@/components/shared/Button'
import Dialogue from '@/components/shared/Dialogue';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Pagination from "@mui/material/Pagination";
import Search from "@/components/shared/Search";
import { useRouter } from "next/navigation";
import Link from 'next/link';


type Props = {
  heads: Array<string>;
  data: Array<any>;
  tableTitle?: string;
  styles?: string;
  route?: string;
};

const Table = ({ heads, data, route, tableTitle }: Props) => {

  const [conformationDialogue, setConformationDialogue] = useState<boolean>(false);
  const [input, setInput] = useState("");


  const toggleDialogueDelete = () => {
    setConformationDialogue((prevValue) => !prevValue);
  };

  return (
    <Fragment>
      <section className='w-[90vw] xs:w-[9vw5] md:w-full bg-white-300 rounded-2xl overflow-auto p-4'>
        <div className='w-full flex justify-between items-center flex-col sm:flex-row'>
          <h4 className="md:text-[22px] text-[18px] text-brand-primary py-2">{tableTitle}</h4>
          <div className="flex justify-between items-center gap-1 md:gap-4">
            <Search value={input} onChange={(e) => setInput(e.target.value)} />
            {
              route &&
              <Link href={route} >
                <Button style="bg-brand-primary font-medium md:text-[16px] text-[14px] h-[40px]" onClick={() => { }} text="Add New" type="submit" />
              </Link>
            }
          </div>
        </div>
        <div className='w-[90vw] xs:w-[100] md:w-full bg-white-300 mt-6 overflow-auto'>
          <table className="w-full min-h-[calc(100vh-350px)] border border-black">
            <thead >
              <tr className="bg-gray-200 ">
                {heads.map((head, index) => (
                  <th key={index} className="w-[20px] py-2 px-4 border border-gray-400 capitalize">{head}</th>
                ))}
                <th className="w-[20px] border border-gray-400 capitalize">Action</th>
              </tr>
            </thead>
            <tbody className='overflow-hidden cursor-pointer'>
              {data?.map((order, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 text-center tracking-wide whitespace-nowrap p-1 text-[14px]">{order.email}</td>
                  <td className="border border-gray-400 text-center tracking-wide whitespace-nowrap p-1 text-[14px]">{order.company}</td>
                  <td className="border border-gray-400 text-center tracking-wide whitespace-nowrap p-1 text-[14px]">{order.lastActiveDate}</td>
                  <td className="border border-gray-400 text-center tracking-wide whitespace-nowrap p-1 text-[14px]">
                    <button onClick={toggleDialogueDelete}>
                      <RiDeleteBin6Line className="md:text-2xl text-[16px] text-black-600 hover:text-error-300" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full mt-2 lg:mt-4 flex justify-center lg:justify-end">
            <Pagination count={4} variant="outlined" shape="rounded" color="primary"/>
          </div>
        </div>
      </section>

      <Dialogue
        show={conformationDialogue}
        onClose={toggleDialogueDelete}
        style="max-w-[400px] bg-brand-primary flex flex-col justify-center items-center p-6 gap-6" >
        <h4 className="w-full text-xl font-bold text-left text-white-600">Are you sure to delete the Vendor?</h4>
        <div className='w-full flex justify-end items-center gap-4'>
          <Button
            style="bg-black-600 font-medium md:text-[16px] text-[14px] h-[20px]"
            onClick={toggleDialogueDelete}
            text="Sure"
            type="submit"
          />
          <Button
            style="bg-black-600 font-medium md:text-[16px] text-[14px] h-[20px]"
            onClick={toggleDialogueDelete}
            text="Cancel"
            type="submit"
          />
        </div>
      </Dialogue>
    </Fragment>
  );
};

export default Table;
