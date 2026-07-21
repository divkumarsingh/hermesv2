"use client"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";


export default function Home() {

  
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <Button variant={"destructive"}>Click me</Button>
    </div>
  );
}
