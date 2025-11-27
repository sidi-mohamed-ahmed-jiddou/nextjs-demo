"use server";

import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export const signIn = async (email: string, password: string) => {
    try {
        // Vérifier d'abord si l'utilisateur existe dans la base de données
        const existingUser = await db
            .select()
            .from(user)
            .where(eq(user.email, email))
            .limit(1);

        if (existingUser.length === 0) {
            return {
                success: false,
                message: "Aucun compte trouvé avec cet email. Veuillez vous inscrire.",
            };
        }

        // Si l'utilisateur existe, tenter la connexion
        await auth.api.signInEmail({
            body: {
                email,
                password,
            },
        });

        return {
            success: true,
            message: "Connexion réussie.",
        };
    } catch (error) {
        const e = error as Error;

        // Retourner le message d'erreur tel quel
        return {
            success: false,
            message: e.message || "Une erreur s'est produite lors de la connexion.",
        };
    }
};

export const signUp = async (name: string, email: string, password: string) => {
    try {
        // Vérifier si l'email existe déjà
        const existingUser = await db
            .select()
            .from(user)
            .where(eq(user.email, email))
            .limit(1);

        if (existingUser.length > 0) {
            return {
                success: false,
                message: "Un compte avec cet email existe déjà. Veuillez vous connecter.",
            };
        }

        await auth.api.signUpEmail({
            body: {
                email,
                password,
                name,
            }
        });

        return {
            success: true,
            message: "Inscription réussie.",
        };
    } catch (error) {
        const e = error as Error;
        return {
            success: false,
            message: e.message || "Une erreur s'est produite lors de l'inscription.",
        };
    }
}