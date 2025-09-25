import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  username: z.string(),
  password: z.string()
});

export const Login = () => {

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
        window.location.reload();
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
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-normal text-gray-800 text-center mb-8">
          Connexion
        </h1>

        {
          error && (
            <div className="text-red-500 mb-4">
              {error}
            </div>
          )
        }

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input 
            type="text" 
            placeholder="Nom d'utilisateur" 
            {...register("username")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <input 
            type="password" 
            placeholder="Mot de passe" 
            {...register("password")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 mt-2"
          >
            {
              isLoading ? 'Connexion...' : 'Se connecter'
            }
          </button>
        </form>
      </div>
    </div>
  );
};
