
import React from "react";
import { Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";

interface ProfileFormValues {
  firstName: string;
  lastName: string;
}

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<ProfileFormValues>;
  onSubmit: (data: ProfileFormValues) => void;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  open,
  onOpenChange,
  form,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-dark-lighter text-white border-neon-orange/20 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-neon-orange">Modifier le profil</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Prénom</FormLabel>
                  <FormControl>
                    <Input 
                      className="bg-dark-light border-neon-orange/20 text-white"
                      placeholder="Votre prénom" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Nom</FormLabel>
                  <FormControl>
                    <Input 
                      className="bg-dark-light border-neon-orange/20 text-white"
                      placeholder="Votre nom" 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="border-neon-orange/20 text-white hover:bg-dark-light"
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="bg-neon-orange hover:bg-neon-orange/80 text-white"
              >
                <Check className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
