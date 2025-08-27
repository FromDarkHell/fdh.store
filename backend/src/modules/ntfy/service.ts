import { AbstractNotificationProviderService } from "@medusajs/framework/utils";
import { MedusaError } from "@medusajs/framework/utils";
import {
  // @ts-ignore
  OrderDTO,
  // @ts-ignore
  ProviderSendNotificationDTO,
  // @ts-ignore
  ProviderSendNotificationResultsDTO,
} from "@medusajs/framework/types";
import axios from "axios";

type Options = {
  notification_url: string;
};

type InjectedDependencies = {};

class ntfyNotificationProviderService extends AbstractNotificationProviderService {
  static identifier = "ntfy";
  protected options: Options;

  constructor(container: InjectedDependencies, options: Options) {
    super();
    this.options = options;
  }

  static validateOptions(options: Record<any, any>): void | never {
    if (!options.notification_url) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        "Notification URL is required"
      );
    }
  }

  async sendOrderNotification(notification: ProviderSendNotificationDTO) {
    const order = notification.data?.order as OrderDTO;
    if (!order) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, "Order not found");
    }

    await axios.post(
      this.options.notification_url,
      `Order #${order.display_id} has been created.`,
      {
        headers: {
          Title: "New Order",
          Priority: "high",
          Tags: "package,shopping_cart",
        },
      }
    );
    return {
      id: order.id,
    };
  }

  async send(
    notification: ProviderSendNotificationDTO
  ): Promise<ProviderSendNotificationResultsDTO> {
    const { template } = notification;

    switch (template) {
      case "order-created":
        return this.sendOrderNotification(notification);
      default:
        throw new MedusaError(
          MedusaError.Types.NOT_FOUND,
          `Template ${template} not supported`
        );
    }
  }
}

export default ntfyNotificationProviderService;
