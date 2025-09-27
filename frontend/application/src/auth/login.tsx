import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AlertCircleIcon } from "lucide-react";
import { postLogin } from "@/apiQueries/authQueries";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { lastUsernameAtom } from "@/jotai/atoms";

const schema = z.object({
  username: z.string(),
  password: z.string()
});

type LoginProps = {
  onLoginSuccess?: () => void;
};

export const Login = ({ onLoginSuccess }: LoginProps) => {
  const navigate = useNavigate()
  const lastUsername = useAtomValue(lastUsernameAtom);

  const { register, handleSubmit } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      username: lastUsername || '',
      password: '',
    },
    resolver: zodResolver(schema)
  });

  const {mutate, isPending, error} = useMutation({
    mutationFn: postLogin,
    onSuccess: (data: {token: string}) => {
      localStorage.setItem('auth-token', data.token);
      onLoginSuccess?.();
      setTimeout(() => {
        navigate({ to: '/' })
      }, 100);
    }
  });

  const onSubmit = async (formData: z.infer<typeof schema>) => mutate(formData);

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
            <div className="flex items-center gap-1 text-destructive text-sm mb-2">
            {
              error && (
                <>
                  <AlertCircleIcon className="size-4" />
                  <span>Identifiants invalides</span>
                </>
              )
            }
            </div>
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
            <Link to="/sign-up" className="text-sm text-muted-foreground ms-1 underline mt-4 block">
              M'inscrire
            </Link>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button 
              type="submit"
              disabled={isPending}
              className={cn('transition-all duration-300', isPending && 'opacity-50 animate-pulse')}
            >
              {
                isPending ? 'Connexion...' : 'Se connecter'
              }
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
