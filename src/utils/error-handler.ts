import { BoondApiError } from "../modules/boond/index.js";
import { toTextContent } from "./formatters.js";

const HTTP_ERROR_MESSAGES: Record<number, string> = {
  401: "Identifiants Boond invalides ou expirés",
  403: "Accès refusé — vérifier les permissions du compte",
  404: "Ressource introuvable dans Boond",
  429: "Rate limit atteint — réessayer dans quelques secondes",
  500: "Erreur interne du serveur Boond",
  502: "Serveur Boond indisponible (502)",
  503: "Serveur Boond en maintenance (503)",
};

/**
 * Converts a BoondApiError (or unknown error) into a structured MCP error response.
 * Returns `isError: true` so the LLM knows the call failed.
 */
export function handleBoondError(error: unknown): {
  content: { type: "text"; text: string }[];
  isError: true;
} {
  if (error instanceof BoondApiError) {
    const message = HTTP_ERROR_MESSAGES[error.status] ?? `Erreur Boond ${error.status}`;
    return {
      content: [toTextContent({ error: message, status: error.status, details: error.body })],
      isError: true,
    };
  }

  const message = error instanceof Error ? error.message : "Erreur inconnue";
  return {
    content: [toTextContent({ error: message })],
    isError: true,
  };
}
