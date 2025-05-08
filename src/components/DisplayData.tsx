import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { User, MapPin,  Check, Search } from "lucide-react";

// Define the structure of the extracted Aadhaar information
export interface AadhaarInfo {
  name?: string;
  dob?: string;
  gender?: string;
  aadhaarNumber?: string;
  address?: string;
  fatherName?: string;
  phoneNumber?: string;
  pincode?: string;
  issuedDate?: string;
  [key: string]: string | undefined;
}

interface InfoFieldProps {
  label: string;
  value?: string;
  className?: string;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value, className }) => (
  <div className={cn("mb-4 group", className)}>
    <p className="text-sm text-muted-foreground mb-1">{label}</p>
    <p className="font-medium text-slate-800 p-2 bg-slate-50/80 rounded-md border border-slate-100 transition-all duration-300 group-hover:bg-white group-hover:border-primary/20">
      {value || "Not detected"}
    </p>
  </div>
);

interface ExtractedInfoDisplayProps {
  info: AadhaarInfo | null;
  isLoading: boolean;
}

export const ExtractedInfoDisplay: React.FC<ExtractedInfoDisplayProps> = ({
  info,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Card className="h-full shadow-card bg-white/80 backdrop-blur-sm border border-slate-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-slate-800">
            Extracted Information
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin-slow" />
            <p className="text-muted-foreground">Extracting information...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!info) {
    return (
      <Card className="h-full shadow-card bg-white/80 backdrop-blur-sm border border-slate-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-slate-800">
            Extracted Information
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[400px] text-center">
          <div className="max-w-md p-6 rounded-lg bg-slate-50/50 border border-dashed border-slate-200">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Search className="h-8 w-8 text-primary/60" />
            </div>
            <p className="text-xl font-medium mb-2 text-slate-800">
              No Data Yet
            </p>
            <p className="text-muted-foreground">
              Upload both images and click "Process Images" to extract
              information
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full shadow-card bg-white/80 backdrop-blur-sm border border-slate-100 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-slate-800 flex items-center">
          <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center mr-2">
            <Check className="h-4 w-4" />
          </span>
          Extracted Information
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <ScrollArea className="h-[400px] pr-3">
          <div className="mb-6">
            <h3 className="text-lg font-semibold gradient-blue mb-3 flex items-center">
              <User className="h-5 w-5 mr-2 text-primary/70" />
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <InfoField label="Name" value={info.name} />
              <InfoField label="Date of Birth" value={info.dob} />
              <InfoField label="Gender" value={info.gender} />
              <InfoField label="Aadhaar Number" value={info.aadhaarNumber} />
              <InfoField label="Phone Number" value={info.phoneNumber} />
              {info.fatherName && (
                <InfoField label="Father's Name" value={info.fatherName} />
              )}
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-lg font-semibold gradient-blue mb-3 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-primary/70" />
              Address Details
            </h3>
            <InfoField label="Address" value={info.address} className="mb-3" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <InfoField label="Pincode" value={info.pincode} />
              <InfoField label="Issued Date" value={info.issuedDate} />
            </div>
          </div>

          <Separator className="my-4" />

          {/* <div>
            <h3 className="text-lg font-semibold gradient-blue mb-3 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-primary/70" />
              Additional Information
            </h3>
            {Object.entries(info)
              .filter(
                ([key]) =>
                  ![
                    "name",
                    "dob",
                    "gender",
                    "aadhaarNumber",
                    "address",
                    "fatherName",
                    "phoneNumber",
                    "pincode",
                    "issuedDate",
                  ].includes(key)
              )
              .map(([key, value]) => (
                <InfoField
                  key={key}
                  label={
                    key.charAt(0).toUpperCase() +
                    key
                      .slice(1)
                      .replace(/([A-Z])/g, " $1")
                      .trim()
                  }
                  value={value}
                />
              ))}
          </div> */}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
