import Link from "next/link";
import Navbar from "../../components/navbar";
import {Layout, SectionHeader, SectionBody} from "/components";



const NewReportPage = () => {

  
  return (
    <Layout title="Submit Report">
      <SectionHeader title="Submit Report"/>
      <SectionBody>
        <div className="md:flex bg-purple-200">
         <div className="md:grow bg-red-200">1</div>
         <div className="md:w-64 lg:w-80 bg-blue-200">2</div>
        </div>
      </SectionBody>
    </Layout>
  );
};

export default NewReportPage;
