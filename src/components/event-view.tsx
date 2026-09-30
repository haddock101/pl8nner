"use client";
import { Button } from "./ui/button";
import {
  Card,
  CardContent
} from "./ui/card";

import { useState } from "react";

export function EventView(props) {


  return (
    <div>
      {toggle && (
        <div className="flex items-center justify-center">
          <Card className="absolute z-20 w-80 max-w-sm rounded-lg bg-white p-6 shadow-md">
            <CardContent>Boooo</CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
