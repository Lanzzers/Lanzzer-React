import React from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import TotalTable from "../totalTable/TotalTable";
import userDarkMode from "@/hooks/useDarkMode";
import Loading from "@/components/Loading";
// import images
import MainLogo from "@/assets/images/logo/logo.svg";
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import supabase from "../auth/supabaseClient";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
const QuotationPreviewPage = () => {
  const printPage = () => {
    window.print();
  };
  const [quotationData, setQuotationData] = useState();
 let {id} = useParams();
//  console.log(id);
  const [isDark] = userDarkMode();

async function getQuotation() {
  try {
    let { data: quotations, error } = await supabase
      .from("quotations")
      .select("*")
      .range(0, 9)
      .ilike("quotation_Id", `%${id}%`);

    // 

    setQuotationData(quotations);
    // setTimeout(() => {
    //   setquotationData(quotations);
    // }, 5000);
  } catch (error) {
    console.log(error);
  }
}
useEffect(() => {
  getQuotation();
}, []);



  return (!quotationData)?<Loading/>:(
    <div>
      <div className="lg:flex justify-between flex-wrap items-center mb-6">
        <h4>{quotationData[0].quotation_id}</h4>
        <div className="flex lg:justify-end items-center flex-wrap space-xy-5">
          <button className="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse">
            <span className="text-lg">
              <Icon icon="heroicons:pencil-square" />
            </span>
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={printPage}
            className="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse"
          >
            <span className="text-lg">
              <Icon icon="heroicons:printer" />
            </span>
            <span>Print</span>
          </button>
          <button className="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse">
            <span className="text-lg">
              <Icon icon="heroicons:arrow-down-tray" />
            </span>
            <span>Download</span>
          </button>
          <button className="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse">
            <span className="text-lg transform -rotate-45">
              <Icon icon="heroicons:paper-airplane" />
            </span>
            <span>Send quotation</span>
          </button>
        </div>
      </div>
      <Card bodyClass="p-0">
        <div className="flex justify-between flex-wrap space-y-4 px-6 pt-6 bg-slate-50 dark:bg-slate-800 pb-6 rounded-t-md">
          <div>
            {/* <img src={isDark ? LogoWhite : MainLogo} alt="" /> */}
            <span className="block text-slate-900 dark:text-slate-300 text-2xl leading-5 ">
            Lanzzer
            </span>

            <div className="text-slate-500 dark:text-slate-300 font-normal leading-5 mt-4 text-sm">
              {quotationData[0].quotationData.ownerName} <br />
          {quotationData[0].quotationData.ownerAddress}
              <div className="flex space-x-2 mt-2 leading-[1] rtl:space-x-reverse">
                <Icon icon="heroicons-outline:phone" />
                <span>{quotationData[0].quotationData.ownerPhone}</span>
              </div>
              <div className="mt-[6px] flex space-x-2 leading-[1] rtl:space-x-reverse">
                <Icon icon="heroicons-outline:mail" />
                <span>{quotationData[0].quotationData.ownerEmail}</span>
              </div>
            </div>
          </div>
          <div>
            <span className="block text-slate-900 dark:text-slate-300 font-medium leading-5 text-xl">
              Bill to:
            </span>

            <div className="text-slate-500 dark:text-slate-300 font-normal leading-5 mt-4 text-sm">
              {quotationData[0].quotationData.recipientName} <br />
              {quotationData[0].quotationData.recipientAddress}
              <div className="flex space-x-2 mt-2 leading-[1] rtl:space-x-reverse">
                <Icon icon="heroicons-outline:phone" />
                <span>{quotationData[0].quotationData.recipientPhone}</span>
              </div>
              <div className="mt-[6px] flex space-x-2 leading-[1] rtl:space-x-reverse">
                <Icon icon="heroicons-outline:mail" />
                <span>{quotationData[0].quotationData.recipientEmail}</span>
              </div>
            </div>
          </div>
          <div className="space-y-[2px]">
            <span className="block text-slate-900 dark:text-slate-300 font-medium leading-5 text-xl mb-4">
              Quotation:
            </span>
            <h4 className="text-slate-600 font-medium dark:text-slate-300 text-xs uppercase">
              Quotation number:
            </h4>
            <div className="text-slate-500 dark:text-slate-300 font-normal leading-5 text-sm">
       {quotationData[0].quotation_id} 
            </div>
            <h4 className="text-slate-600 font-medium dark:text-slate-300 text-xs uppercase">
              date
            </h4>
            <div className="text-slate-500 dark:text-slate-300 font-normal leading-5 text-sm">
              {quotationData[0].quotationData.creationDate.split("T")[0]}
            </div>
          </div>
        </div>
        <div className="max-w-[980px] mx-auto shadow-base dark:shadow-none my-8 rounded-md overflow-x-auto">
          <TotalTable data={quotationData[0].quotationData.itemData} notes={quotationData[0].quotationData.additionalNote} />
        </div>
        <div className="py-10 text-center md:text-2xl text-xl font-normal text-slate-600 dark:text-slate-300">
          Thank you for your purchase!
        </div>
      </Card>
    </div>
  );
};

export default QuotationPreviewPage;
