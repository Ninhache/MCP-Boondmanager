/**
 * Shared helpers for MCP write tools (create / update / delete).
 * Wraps BoondClient POST/PATCH/DELETE calls in the JSON:API body format.
 */

import type { BoondDetailResponse } from "../generated/helpers.js";
import type { BoondClient } from "../modules/boond/boond.client.js";
import { handleBoondError } from "./error-handler.js";
import { formatDetail, toTextContent } from "./formatters.js";

export interface WriteToolConfig {
  /** API path (e.g. "/actions") */
  path: string;
  /** JSON:API resource type (e.g. "action") */
  resourceType: string;
}

/**
 * POST to a Boond endpoint with JSON:API body.
 * Returns the created resource formatted for the LLM.
 */
export async function executeCreateTool(
  client: BoondClient,
  config: WriteToolConfig,
  attributes: Record<string, unknown>,
): Promise<{ content: { type: "text"; text: string }[]; isError?: true }> {
  try {
    const body = {
      data: {
        type: config.resourceType,
        attributes,
      },
    };
    const response = await client.post<BoondDetailResponse>(config.path, body);
    const formatted = formatDetail(response);
    const id = response?.data?.id ?? "unknown";
    return {
      content: [
        toTextContent({
          success: true,
          message: `✓ Created ${config.resourceType} with ID ${id}`,
          resource: formatted,
        }),
      ],
    };
  } catch (error) {
    return handleBoondError(error);
  }
}

/**
 * PUT to a Boond resource by ID with JSON:API body.
 * Returns the updated resource formatted for the LLM.
 *
 * Note: Boond uses PUT for updates (not PATCH), per the RAML spec.
 */
export async function executeUpdateTool(
  client: BoondClient,
  config: WriteToolConfig,
  id: number,
  attributes: Record<string, unknown>,
): Promise<{ content: { type: "text"; text: string }[]; isError?: true }> {
  try {
    const body = {
      data: {
        id: String(id),
        type: config.resourceType,
        attributes,
      },
    };
    const response = await client.put<BoondDetailResponse>(`${config.path}/${id}`, body);
    const formatted = formatDetail(response);
    return {
      content: [
        toTextContent({
          success: true,
          message: `✓ Updated ${config.resourceType} ${id}`,
          resource: formatted,
        }),
      ],
    };
  } catch (error) {
    return handleBoondError(error);
  }
}

/**
 * Execute a POST action endpoint (e.g. /validate, /reject, /pay).
 * These endpoints typically have no request body (or a small one), and return
 * either the updated resource or just a success status.
 *
 * @param client - BoondClient instance
 * @param path - Full path to the action (e.g. "/absences-reports/42/validate")
 * @param actionLabel - Human-readable label (e.g. "validated", "rejected")
 * @param body - Optional request body (for actions that accept one, like reject with comment)
 */
export async function executeActionTool(
  client: BoondClient,
  path: string,
  actionLabel: string,
  body?: Record<string, unknown>,
): Promise<{ content: { type: "text"; text: string }[]; isError?: true }> {
  try {
    const response = await client.post<BoondDetailResponse | undefined>(path, body ?? {});
    const formatted = response?.data ? formatDetail(response) : null;
    return {
      content: [
        toTextContent({
          success: true,
          message: `✓ ${actionLabel}`,
          ...(formatted && { resource: formatted }),
        }),
      ],
    };
  } catch (error) {
    return handleBoondError(error);
  }
}

/**
 * DELETE a Boond resource by ID.
 * Returns a success confirmation — the resource is permanently removed.
 */
export async function executeDeleteTool(
  client: BoondClient,
  config: WriteToolConfig,
  id: number,
): Promise<{ content: { type: "text"; text: string }[]; isError?: true }> {
  try {
    await client.delete(`${config.path}/${id}`);
    return {
      content: [
        toTextContent({
          success: true,
          message: `✓ Deleted ${config.resourceType} ${id}`,
        }),
      ],
    };
  } catch (error) {
    return handleBoondError(error);
  }
}
