"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { FileJson, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface JsonUploadModalProps {
  buttonLabel: string;
  dialogTitle: string;
  dialogDescription: string;
  action: (
    formData: FormData
  ) => Promise<{ success: boolean; message: string }>;
}

const JsonUploadModal = ({
  buttonLabel,
  dialogDescription,
  dialogTitle,
  action,
}: JsonUploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files?.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type === "application/json") {
        setFile(selectedFile);
      } else {
        setUploadStatus("Please select a JSON file");
      }
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!file) {
      setUploadStatus("Please select a  json file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadStatus("Uploading...");
      setUploadProgress(0);

      const progressInterval = setInterval(() => {
        setUploadProgress((prevProgress) => Math.min(prevProgress + 10, 90));
      }, 500);

      const result = await action(formData);
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadStatus(result.message || "Data Uploaded Successfully");
      setIsOpen(false);
      toast(result.message);
      setUploadProgress(0);
      setUploadStatus(null);
      setFile(null);
    } catch (error) {
      setUploadStatus(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        {/* @ts-ignore */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FileJson className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload </span> or
                  drag and drop
                </p>
                <p className="text-xs text-gray-500">JSON file only</p>
              </div>

              <Input
                id="dropzone-file"
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {file && (
            <div className="flex items-center justify-between bg-muted p-2 rounded-md">
              <span className="text-sm truncate">{file.name}</span>
              <Button
                type="button"
                variant={"ghost"}
                size={"sm"}
                onClick={() => setFile(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          {uploadStatus && (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="w-full" />
              <div
                className={`p-2 rounded-md ${
                  uploadStatus.startsWith("Error")
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {uploadStatus}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              type="submit"
              disabled={!file || uploadStatus === "Uploading..."}
            >
              Upload Json
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JsonUploadModal;
