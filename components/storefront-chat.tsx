"use client";

import { DemoModal } from "@/components/demo-modal";
import { useState } from "react";

type Props = { storeName: string };

export function StorefrontChat({ storeName }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return <DemoModal isOpen={isOpen} onClose={() => setIsOpen(false)} storeName={storeName} />;
}
