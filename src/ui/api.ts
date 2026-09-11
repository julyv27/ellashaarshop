import type { FiltersPayload, OrderDetail, OrderSummary, Product, UserInfo } from "../shared/types";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api/${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {})
    }
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error ?? "Er ging iets mis.");
  }
  return response.json() as Promise<T>;
}

export const api = {
  me: () => request<{ user: UserInfo }>("me"),
  filters: () => request<FiltersPayload>("filters"),
  products: (params: URLSearchParams) => request<{ products: Product[] }>(`products?${params.toString()}`),
  saveOrder: (items: Array<{ productId: number; quantity: number }>) => request<{ order: OrderSummary }>("orders", {
    method: "POST",
    body: JSON.stringify({ items })
  }),
  orders: () => request<{ orders: OrderSummary[] }>("orders"),
  order: (id: number) => request<{ order: OrderDetail }>(`orders/${id}`),
  createEntity: (entity: string, body: Record<string, unknown>) => request<{ ok: true }>(`admin/${entity}`, {
    method: "POST",
    body: JSON.stringify(body)
  }),
  createProduct: (body: Record<string, unknown>) => request<{ product: Product }>("admin/products", {
    method: "POST",
    body: JSON.stringify(body)
  }),
  updateProduct: (id: number, body: Record<string, unknown>) => request<{ product: Product }>(`admin/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(body)
  })
};
