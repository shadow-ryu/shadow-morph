import BottomNav from "@/components/common/BottomNav";
import LeftSidebar from "@/components/common/LSideBar";
import Dashboard from "@/components/custom-ui/Dashboard";
import PreviewScreen from "@/components/custom-ui/personalize/PreviewScreen";
import Image from "next/image";
import { cookies } from "next/headers";
const Home = () => {
 

  return (
    <main className="h-screen w-full bg-dark-3">
      <Dashboard
        accounts={[]}
        navCollapsedSize={3}
      />
    </main>
  );
};
export default Home;
