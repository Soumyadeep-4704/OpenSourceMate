import Link from "next/link";
import Hero from "./components/Hero";
import IssueDashboard from "./components/IssueDashboard";



//HomePage
export default function Home() {
  return (
    <>
        <Hero />
        <IssueDashboard />
        <footer></footer>
    </>
  );
}