"use client";
import ActionButton from "@/components/atoms/buttons/ActionButton";
import FileDropzone from "@/components/molecules/forms/FileDropzone";
import FormInput from "@/components/molecules/forms/FormInput";
import FormSelect from "@/components/molecules/forms/FormSelect";
import FormTextarea from "@/components/molecules/forms/FormTextArea";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const storeSchema = z.object({
    store_name: z.string({required_error: 'Store name required'}).min(3, {message: 'Store name too short'}).max(50, {message: 'Store name too long'}),
    country: z.string({required_error: 'Country required'}),
    logo: z.string({required_error: 'Provide logo url'}),
    description: z.string({required_error: 'Store description is required'}).min(50, {message: 'Store description too short'}),
    documents: z.string({required_error: 'Upload at least one of legal document'}).array()

})
const CreateStoreScreen = () => {
  const [selectedLogo, setSelectedLogo] = useState<FileList>();
  const [selectedFiles, setSelectedFiles] = useState<FileList>();
  const form = useForm({
    resolver: zodResolver(storeSchema)
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="gap-3">
          <FormInput
            name="store_name"
            label="Store Name"
            control={form.control}
            placeholder="Enter store name"
          />
          <FormSelect
            name="country"
            label="Country"
            control={form.control}
            placeholder="Select country..."
            items={[
              { label: "Kenya", value: "Kenya" },
              { label: "Uganda", value: "Uganda" },
              { label: "Tanzania", value: "Tanzania" },
              { label: "Rwanda", value: "Rwanda" },
            ]}
          />
          <FormTextarea
            control={form.control}
            name="description"
            label="Store description"
            placeholder="Describe your store"
          />
          <div>
            <FileDropzone
                control={form.control}
                name="logo"
                label="Store Logo"
                setAcceptedFiles={setSelectedLogo}
                multiple={false}
                accept={{'image/png': ['.png', '.jpeg', '.jpg'],}}
            />
            {selectedLogo && selectedLogo[0].name}
          </div>
          
          <FileDropzone
            control={form.control}
            name="documents"
            label="Other Documents"
            setAcceptedFiles={setSelectedFiles}
            accept={{'application/pdf': ['.pdf'],}}
          />

          <ActionButton title="Create Store" type="submit" loaderText="Creating store..."/>
        </form>
      </Form>
    </div>
  );
};

export default CreateStoreScreen;
