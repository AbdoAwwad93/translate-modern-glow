import { apiClient } from "../api/client";
import type {
  Order,
  UpdateOrderStatusDto,
  OrderCreateDto,
  GeneralResponse,
} from "../types/index";

export const orderService = {
  // Make a new order (any user)

  async makeOrder(dto: OrderCreateDto): Promise<Order> {
    const formData = new FormData();

    // Required fields
    formData.append("CustomerName", dto.CustomerName);
    formData.append("CustomerEmail", dto.CustomerEmail);
    formData.append("CustomerPhoneNumber", dto.CustomerPhoneNumber);
    formData.append("DeadLine", dto.DeadLine.toISOString());
    formData.append("PageCount", dto.PageCount.toString());
    formData.append("PreferredContact", dto.PreferredContact);

    // Optional fields (only append if they exist)
    if (dto.Notes) formData.append("Notes", dto.Notes);
    if (dto.WordCount !== undefined)
      formData.append("WordCount", dto.WordCount.toString());
    if (dto.SourceLanguage)
      formData.append("SourceLanguage", dto.SourceLanguage);
    if (dto.TargetLanguage)
      formData.append("TargetLanguage", dto.TargetLanguage);

    // REQUIRED array (must send correctly)
    dto.Services.forEach((service, idx) =>
      formData.append(`Services[${idx}]`, service)
    );

    // File (optional)
    if (dto.File) {
      formData.append("File", dto.File);
    }

    const response = await apiClient.post<GeneralResponse<Order>>(
      "/api/order/makeOrder",
      formData
    );

    if (response.isSuccess) {
      return response.data;
    }

    throw new Error(response.message || "Failed to make order");
  },

  // Get all orders (Admin only)
  async getOrders(): Promise<Order[]> {
    const response = await apiClient.get<GeneralResponse<Order[]>>(
      "/api/order/getOrders"
    );

    if (response.isSuccess) {
      return response.data;
    }

    throw new Error(response.message || "Failed to fetch orders");
  },

  // Update order status (Admin only)
  async updateOrderStatus(
    orderId: number,
    status: UpdateOrderStatusDto
  ): Promise<Order> {
    // FIXED: using a correct update URL (adjust if backend is different)
    const response = await apiClient.patch<GeneralResponse<Order>>(
      `/api/order/updateStatus/${orderId}`,
      status
    );

    if (response.isSuccess) {
      return response.data;
    }

    throw new Error(response.message || "Failed to update order status");
  },
};
