import { PayPalButtonsComponentOptions } from "@paypal/paypal-js/types/components/buttons";
import { PayPalScriptOptions } from "@paypal/paypal-js/types/script-options";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { toast } from "react-toastify";

const paypalScriptOptions = {
  "client-id":
    "Aed_SSITC_dWw2MV1ylZoGdfrXtmzJG9BOJmHn1-nC7agzyUUu83oXg9QUBgFf7m6c_xNrOkuSlajcjZ",
  currency: "USD",
};
//EEgkDoADJC2IdIWrrvuTbNlHNDepzbNFFKrTX6vBYVZexpl4hKNEbt5kWvT9vAAt6URm4X9sdaSeIOeg
interface IProps {
  amount: string;
  onSuccess: () => void;
}

const ButtonWrapper = ({ amount, onSuccess }: IProps) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: "USD",
      },
    });
  }, []);

  return (
    <>
      {isPending && <div className="spinner" />}
      <PayPalButtons
        disabled={false}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function () {
            // Your code here after capture the order
            toast.success("Payment Successful");
            onSuccess();
          });
        }}
      />
    </>
  );
};
export default function PaypalButton({ amount, onSuccess }: IProps) {
  return (
    <div className="flex items-center justify-center w-full">
      <PayPalScriptProvider options={paypalScriptOptions}>
        <ButtonWrapper {...{ amount, onSuccess }} />
      </PayPalScriptProvider>
    </div>
  );
}
