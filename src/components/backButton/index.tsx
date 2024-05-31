"use client"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
function BackButton() {
    const router = useRouter();
    return (
        <Button variant="outline" className="rounded" onClick={() => {
            alert("Back button clicked");
            router.back();
        }}>Back</Button>
    );
}

export default BackButton;