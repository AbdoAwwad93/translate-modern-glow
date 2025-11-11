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
    formData.append("CustomerName", dto.CustomerName);
    formData.append("CustomerEmail", dto.CustomerEmail);
    formData.append("CustomerPhoneNumber", dto.CustomerPhoneNumber);
    formData.append("DeadLine", dto.DeadLine.toISOString());
    formData.append("Notes", dto.Notes || "");
    formData.append("PageCount", dto.PageCount.toString());
    formData.append("WordCount", dto.WordCount?.toString() || "0");
    formData.append("PreferredContact", dto.PreferredContact);
    formData.append("SourceLanguage", dto.SourceLanguage);
    formData.append("TargetLanguage", dto.TargetLanguage);

    if (dto.Services && dto.Services.length > 0) {
      dto.Services.forEach((service) => formData.append("Services", service));
    }

    if (dto.File) {
      formData.append("File", dto.File);
    }

    const response = await apiClient.post<GeneralResponse<Order>>(
      "/makeOrder",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (response.isSuccess) {
      return response.data;
    }

    throw new Error(response.message || "Failed to make order");
  },

  // Get all orders (Admin only)
  async getOrders(): Promise<Order[]> {
    const response = await apiClient.post<GeneralResponse<Order[]>>("/orders");
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
    const response = await apiClient.patch<GeneralResponse<Order>>(
      `/orders/${orderId}`,
      status
    );

    if (response.isSuccess) {
      return response.data;
    }

    throw new Error(response.message || "Failed to update order status");
  },
};
