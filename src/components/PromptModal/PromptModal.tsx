import React from "react";

const PromptModal = () => {
  return <div>PromptModal</div>;
};

export default PromptModal;

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// export default function Component() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [inputValue, setInputValue] = useState("");

//   const handleOpenChange = (open: boolean) => {
//     setIsOpen(open);
//     if (!open) setInputValue("");
//   };

//   const handleSubmit = () => {
//     console.log("Submitted value:", inputValue);
//     setIsOpen(false);
//     setInputValue("");
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={handleOpenChange}>
//       <DialogTrigger asChild>
//         <Button variant="outline">Open Prompt</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Enter Information</DialogTitle>
//           <DialogDescription>
//             Please provide the required information below.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="input" className="text-right">
//               Input
//             </Label>
//             <Input
//               id="input"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               className="col-span-3"
//               placeholder="Type your input here..."
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button variant="outline" onClick={() => setIsOpen(false)}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit}>Submit</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
