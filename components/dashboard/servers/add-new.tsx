import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircleIcon } from "lucide-react";
import React from "react";

const AddNewCard = () => {
  return (
    <Card>
      <CardHeader className="flex justify-center items-center">
        <CardTitle>Add new server</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <PlusCircleIcon />
      </CardContent>
    </Card>
  );
};  

export { AddNewCard };
