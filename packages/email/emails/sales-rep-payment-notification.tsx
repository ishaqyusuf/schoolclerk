import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Text,
} from "@react-email/components";

import { formatCurrency } from "@school-clerk/utils/format";

interface NotifySalesRepPayment {
  repName: string;
  customerName: string;
  amount: number;
  ordersNo: string[];
  email: string;
}
export const _salesRepPaymentNotificationEmail = (
  props: NotifySalesRepPayment,
) => {
  return <SalesRepPaymentNotificationEmail {...props} />;
};
export default function SalesRepPaymentNotificationEmail(
  props: NotifySalesRepPayment,
) {
  const { ordersNo, amount, repName, customerName } = props;

  return (
    <Html>
      <Head />
      <Preview>
        Payment Received - Order{ordersNo?.length > 0 ? "s" : ""} #
        {ordersNo.join(", ")}
      </Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
        <Container>
          <Text>Hi {repName},</Text>
          <Text>
            A payment of <strong>{formatCurrency.format(amount)}</strong> has
            been received from {customerName} for Order{" "}
            <strong>#{ordersNo.join(", ")}</strong>.
          </Text>
          <Text>Please verify the transaction in your sales dashboard.</Text>
          <Text>Best regards,</Text>
          <Text>Sales Team</Text>
        </Container>
      </Body>
    </Html>
  );
}
