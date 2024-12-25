'use client'

import React, { useState, JSX } from 'react'
import TabComponent from './_component/Tab'
import { RiTestTubeLine } from 'react-icons/ri';
import { CiViewList } from 'react-icons/ci';
import { AiFillAudio } from 'react-icons/ai';
import { FaFilePdf } from 'react-icons/fa';
import { IoMdMicrophone } from 'react-icons/io';
import { IoDocumentSharp } from 'react-icons/io5';



import AudioUpload from './_component/AudioUpload'
import PdfUpload from "./_component/PdfUploader";
import AudioList from "./_component/audio/AudioList";
import PdfList from "./_component/pdf/PdfList";


interface PackageTabItem {
  id: string;
  label: string;
  icon: JSX.Element;
}


const tabs: PackageTabItem[] = [
  { id: 'Audio', label: 'Audio', icon: <AiFillAudio className="text-xl" /> },
  { id: 'pdf', label: 'Pdf', icon: <FaFilePdf className="text-xl" /> },
  { id: "AudioList", label: 'Audio List', icon: <IoMdMicrophone className="text-xl" /> },
  { id: "pdfList", label: 'Pdf List', icon: <IoDocumentSharp className="text-xl" /> },
  
 
];

const Page = () => {
  const [selectedTab, setSelectedTab] = React.useState<string>('Audio');
  return (
    <TabComponent
      tabs={tabs}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab} // Pass tab change handler
    >
      {/* Render tab-specific content */}
      {selectedTab === 'Audio' && <AudioUpload />}
      {selectedTab === 'pdf' && <PdfUpload />}
      {selectedTab === 'AudioList' && <AudioList />}
      {selectedTab === 'pdfList' && <PdfList />}


    </TabComponent>
  );
};

export default Page;