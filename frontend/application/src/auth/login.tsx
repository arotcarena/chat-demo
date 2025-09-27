import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AlertCircleIcon } from "lucide-react";

const schema = z.object({
  username: z.string(),
  password: z.string()
});

type LoginProps = {
  onLoginSuccess?: () => void;
};

export const Login = ({ onLoginSuccess }: LoginProps) => {

  const { register, handleSubmit } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema)
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const onSubmit = async (formData: z.infer<typeof schema>) => {
    setIsLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('auth-token', data.token);
        onLoginSuccess?.();
      } else {
        throw new Error('error');
      }
    } catch (e) {
      setError('Identifiants invalides');
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center">Connexion</CardTitle>
            <CardDescription>
              Entrez vos identifiants ci-dessous pour vous connecter au chat
            </CardDescription>
          </CardHeader>
          <CardContent>
            {
              error && (
                <div className="flex items-center gap-1 text-destructive text-sm mb-2 -mt-2">
                  <AlertCircleIcon className="size-4" />
                  <span>{error}</span>
                </div>
              )
            }
            <Input 
              type="text" 
              placeholder="Nom d'utilisateur"
              className="my-1"
              {...register("username")}
            />
            <Input 
              type="password" 
              placeholder="Mot de passe"
              className="my-1"
              {...register("password")}
            />
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button 
              type="submit"
              disabled={isLoading}
            >
              {
                isLoading ? 'Connexion...' : 'Se connecter'
              }
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
