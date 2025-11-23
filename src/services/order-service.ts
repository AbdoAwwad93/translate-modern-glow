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
    if (!dto.File) throw new Error("File is required");
    if (!dto.Services || dto.Services.length === 0)
      throw new Error("At least one service is required");

    const formData = new FormData();

    // Add all required fields - names must match backend DTO properties EXACTLY
    formData.append("CustomerName", dto.CustomerName);
    formData.append("CustomerEmail", dto.CustomerEmail);
    formData.append("CustomerPhoneNumber", dto.CustomerPhoneNumber);

    // Format deadline properly - ASP.NET Core expects ISO 8601 format
    formData.append("DeadLine", dto.DeadLine);

    formData.append("PageCount", dto.PageCount.toString());
    formData.append("WordCount", dto.WordCount?.toString() || "0");
    formData.append("PreferredContact", dto.PreferredContact);

    // Optional fields - only append if they exist
    if (dto.Notes && dto.Notes.trim()) {
      formData.append("Notes", dto.Notes);
    }

    if (dto.SourceLanguage) {
      formData.append("SourceLanguage", dto.SourceLanguage);
    }

    if (dto.TargetLanguage) {
      formData.append("TargetLanguage", dto.TargetLanguage);
    }

    // IMPORTANT: For arrays/lists in FormData, append each item separately
    // ASP.NET Core model binder expects this format
    if (dto.Services && dto.Services.length > 0) {
      dto.Services.forEach((service) => {
        formData.append("Services", service);
      });
    }

    // File must be appended last (common practice)
    formData.append("File", dto.File);

    console.log("FormData content:");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await apiClient.post<GeneralResponse<Order>>(
        "/api/order/makeOrder",
        formData
      );

      if (response.isSuccess) return response.data;
      throw new Error(response.message || "Failed to make order");
    } catch (error: any) {
      console.error("API Error Details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        errors: error.response?.data?.errors,
        title: error.response?.data?.title,
      });

      // Show specific validation errors if available
      if (error.response?.data?.errors) {
        console.error("Validation Errors:");
        Object.entries(error.response.data.errors).forEach(
          ([field, messages]) => {
            console.error(`  ${field}:`, messages);
          }
        );
      }

      throw error;
    }
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
