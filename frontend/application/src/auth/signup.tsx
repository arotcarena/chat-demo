import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AlertCircleIcon, ArrowLeftIcon } from "lucide-react";
import { postSignUp } from "@/apiQueries/authQueries";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useSetAtom } from "jotai";
import { lastUsernameAtom } from "@/jotai/atoms";
import type { User } from "@/types";

const schema = z.object({
  username: z.string().min(3, {message: "Le nom d'utilisateur doit contenir au moins 3 caractères"}).max(200, {message: "Le nom d'utilisateur ne doit pas dépasser 200 caractères"}),
  password: z.string().min(6, {message: "Le mot de passe doit contenir au moins 6 caractères"}).max(200, {message: "Le mot de passe ne doit pas dépasser 200 caractères"}),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export const SignUp = () => {
  const navigate = useNavigate()
  const setLastUsername = useSetAtom(lastUsernameAtom);

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema)
  });

  const {mutate, isPending, error} = useMutation({
    mutationFn: postSignUp,
    onSuccess: (user: User) => {
        console.log('dans signup', user);
        setLastUsername(user.username)
        navigate({ to: '/login' })
    }
  });

  const onSubmit = async (formData: z.infer<typeof schema>) => {
    const { confirmPassword, ...signUpData } = formData;
    mutate(signUpData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       <Card className="w-full max-w-sm">
          <CardHeader>
            <Link to="/login" className="text-sm text-muted-foreground flex items-center gap-0.5 mb-4">
                <ArrowLeftIcon className="size-4" />
                Connexion
            </Link>
            <CardTitle className="text-center">Inscription</CardTitle>
            <h1 className="text-center text-2xl lg:text-3xl font-bold text-rose-500 my-4">ChatDemo</h1>
            <CardDescription>
              Créez votre compte pour accéder au chat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-destructive text-sm mb-2">
            {
              error && (
                <>
                  <AlertCircleIcon className="size-4" />
                  <span>Erreur lors de l'inscription</span>
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
            <Input 
              type="password" 
              placeholder="Confirmer le mot de passe"
              className="my-1"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <div className="flex items-center gap-1 text-destructive text-sm">
                <AlertCircleIcon className="size-4" />
                <span>{errors.confirmPassword.message}</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button 
              type="submit"
              disabled={isPending}
              className={cn('transition-all duration-300', isPending && 'opacity-50 animate-pulse')}
            >
              {
                isPending ? 'Inscription...' : 'S\'inscrire'
              }
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
