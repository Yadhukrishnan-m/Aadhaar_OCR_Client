import React, { useState, useEffect } from "react";
import { ImageUploader } from "@/components/ImageUpload";
import {
  ExtractedInfoDisplay,
  AadhaarInfo,
} from "@/components/DisplayData";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  processAadhaarImages,
  createObjectURL,
  revokeObjectURL,
} from "@/services/OcrServices";
import { Search } from "lucide-react";
import { AxiosError } from "axios";

const AadhaarOcrPage: React.FC = () => {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [frontImageUrl, setFrontImageUrl] = useState<string>("");
  const [backImageUrl, setBackImageUrl] = useState<string>("");
  const [extractedInfo, setExtractedInfo] = useState<AadhaarInfo | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Cleanup object URLs when component unmounts or when images change
    return () => {
      if (frontImageUrl) revokeObjectURL(frontImageUrl);
      if (backImageUrl) revokeObjectURL(backImageUrl);
    };
  }, [frontImageUrl, backImageUrl]);

  const handleFrontImageUpload = (file: File) => {
    if (frontImageUrl) revokeObjectURL(frontImageUrl);
    const url = createObjectURL(file);
    setFrontImage(file);
    setFrontImageUrl(url);
    console.log("Front image uploaded:", file.name, "URL:", url);
  };

  const handleBackImageUpload = (file: File) => {
    if (backImageUrl) revokeObjectURL(backImageUrl);
    const url = createObjectURL(file);
    setBackImage(file);
    setBackImageUrl(url);
    console.log("Back image uploaded:", file.name, "URL:", url);
  };

  const handleProcessImages = async () => {
    if (!frontImage || !backImage) {
      toast({
        title: "Missing images",
        description:
          "Please upload both front and back images of the Aadhaar card",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const result = await processAadhaarImages(frontImage, backImage);
      setExtractedInfo(result);
      toast({
        title: "Success",
        description: "Aadhaar information extracted successfully",
      });
    } catch (error :unknown) {

if (error instanceof AxiosError) {
      toast({
        title: "Error processing images",
        description:
        error.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    
}      
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-blue">
            Aadhaar Card OCR
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload images of the front and back of your Aadhaar card to extract
            the information.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white/50 p-6 rounded-xl shadow-soft backdrop-blur-sm border border-slate-100">
              <h2 className="text-xl font-semibold mb-4 text-slate-800">
                Upload Images
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUploader
                  title="Front Side"
                  onImageUpload={handleFrontImageUpload}
                  previewUrl={frontImageUrl}
                  isLoading={isProcessing}
                />
                <ImageUploader
                  title="Back Side"
                  onImageUpload={handleBackImageUpload}
                  previewUrl={backImageUrl}
                  isLoading={isProcessing}
                />
              </div>

              <div className="mt-6">
                <Button
                  onClick={handleProcessImages}
                  className="w-full h-12 text-lg shadow transition-all duration-300 hover:shadow-md"
                  disabled={!frontImage || !backImage || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-2" />
                      Process Images
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <ExtractedInfoDisplay info={extractedInfo} isLoading={isProcessing} />
        </div>
      </div>
    </div>
  );
};

export default AadhaarOcrPage;
