import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  title: string;
  onImageUpload: (file: File) => void;
  previewUrl?: string;
  isLoading?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  title,
  onImageUpload,
  previewUrl,
  isLoading = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndUploadImage(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndUploadImage(e.target.files[0]);
    }
  };

  const validateAndUploadImage = (file: File) => {
    // Check if the file is an image
    if (!file.type.match("image.*")) {
      toast({
        title: "Invalid file type",
        description: "Please upload only image files",
        variant: "destructive",
      });
      return;
    }

    // Check if the file size is less than 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image less than 5MB",
        variant: "destructive",
      });
      return;
    }

    onImageUpload(file);
  };

  console.log(`${title} preview URL:`, previewUrl);

  return (
    <Card className="w-full shadow-card overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-3 text-slate-800">{title}</h3>

        {previewUrl ? (
          <div className="relative w-full aspect-[3/2] overflow-hidden rounded-lg border-2 border-primary/20 shadow-inner bg-gradient-to-b from-slate-50 to-white transition-all duration-300 group hover:border-primary/40">
            <img
              src={previewUrl}
              alt={`${title} preview`}
              className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
              onError={(e) =>
                console.error(`Error loading image for ${title}:`, e)
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <Button
              onClick={() =>
                document
                  .getElementById(`file-upload-${title.replace(/\s/g, "-")}`)
                  ?.click()
              }
              size="sm"
              variant="secondary"
              className="absolute bottom-3 right-3 shadow-md opacity-80 hover:opacity-100 transition-opacity"
              disabled={isLoading}
            >
              Change
            </Button>
          </div>
        ) : (
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center flex flex-col items-center justify-center h-[200px] transition-all duration-300",
              isDragging
                ? "border-primary animate-pulse-border bg-primary/5"
                : "border-gray-200 hover:border-primary/70",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {isLoading ? (
              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-500">Processing...</p>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  {isDragging ? (
                    <ImageIcon className="h-6 w-6 text-primary" />
                  ) : (
                    <Upload className="h-6 w-6 text-primary" />
                  )}
                </div>
                <p className="text-sm font-medium mb-1 text-slate-700">
                  {isDragging
                    ? "Drop image here"
                    : "Drag and drop or click to upload"}
                </p>
                <p className="text-xs text-gray-500">
                  Supports: JPG, PNG, JPEG (Max 5MB)
                </p>
              </>
            )}
          </div>
        )}

        <input
          id={`file-upload-${title.replace(/\s/g, "-")}`}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
          disabled={isLoading}
        />

        {!previewUrl && !isLoading && (
          <Button
            onClick={() =>
              document
                .getElementById(`file-upload-${title.replace(/\s/g, "-")}`)
                ?.click()
            }
            className="w-full mt-4 transition-all duration-300 shadow-sm hover:shadow"
            variant="outline"
          >
            Select Image
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
