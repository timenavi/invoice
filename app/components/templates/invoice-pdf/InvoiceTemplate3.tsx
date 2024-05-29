import React from "react";

// Components
import { InvoiceLayout } from "@/app/components";

// Helpers
import { isDataUrl } from "@/lib/helpers";

// Variables
import { DATE_OPTIONS } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";
import { cn } from "@/lib/utils";
import { formatAmount } from "@/lib/formatting";

const InvoiceTemplate3 = (data: InvoiceType) => {
  const { sender, receiver, details } = data;
  return (
    <InvoiceLayout data={data}>
 
        <div className="flex justify-between">
          <div>
            {details.invoiceLogo && (
              <img
                src={details.invoiceLogo}
                width={140}
                height={100}
                alt={`Logo of ${sender.name}`}
              />
            )}
          </div>
          <div className="text-right">
            <div className="flex space-x-1 justify-center items-center">
              <h2 className="text-gray-800 font-medium">Invoice #</h2>
              <span className="block text-gray-700">
                {details.invoiceNumber}
              </span>
            </div>
            <address className="mt-4 not-italic text-gray-800">
              {sender.name}
              <br />
              {sender.address.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </address>
          </div>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          <div>
            <h3 className="text-sm text-gray-800">Bill to:</h3>
            <h3 className="font-medium text-gray-800">{receiver.name}</h3>
            <address className="mt-2 not-italic text-gray-700">
              {receiver.address.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </address>
          </div>
          <div className="sm:text-right space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-1">
              <dl className="grid sm:grid-cols-6 gap-x-1">
                <dt className="col-span-3 font-medium text-gray-800">
                  Invoice date
                </dt>
                <dd className="col-span-3 text-gray-700">
                  {new Date(details.invoiceDate).toLocaleDateString(
                    "en-US",
                    DATE_OPTIONS
                  )}
                </dd>
              </dl>
              <dl className="grid sm:grid-cols-6 gap-x-1">
                <dt className="col-span-3 font-medium text-gray-800">
                  Due date
                </dt>
                <dd className="col-span-3 text-gray-700">
                  {new Date(details.dueDate).toLocaleDateString(
                    "en-US",
                    DATE_OPTIONS
                  )}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="border border-gray-200 p-2 rounded-md space-y-1">
            <div className="hidden sm:grid sm:grid-cols-5">
              <div className="sm:col-span-2 text-xs font-medium text-gray-700 uppercase">
                Item
              </div>
              <div className="text-left text-xs font-medium text-gray-700 uppercase">
                Qty
              </div>
              <div className="text-left text-xs font-medium text-gray-700 uppercase">
                Rate
              </div>
              <div className="text-right text-xs font-medium text-gray-700 uppercase">
                Amount
              </div>
            </div>
            <div className="hidden sm:block border-b border-gray-200"></div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-y-1 group">
              {details.items.map((item, index) => (
                <React.Fragment key={index}>
                  <div
                    className={cn(
                      `col-span-full sm:col-span-2 border-b border-gray-300 ${
                        index + 1 === details.items.length && "border-none"
                      }`
                    )}
                  >
                    <p className="font-medium text-gray-800">{item.name}</p>
                  </div>
                  <div
                    className={`border-b border-gray-300 ${
                      index + 1 === details.items.length && "border-none"
                    }`}
                  >
                    <p className="text-gray-800">{item.quantity}</p>
                  </div>
                  <div
                    className={`border-b border-gray-300 ${
                      index + 1 === details.items.length && "border-none"
                    }`}
                  >
                    <p className="text-gray-800">
                      {formatAmount(item.unitPrice, details.currency)}
                    </p>
                  </div>
                  <div
                    className={`border-b border-gray-300 ${
                      index + 1 === details.items.length && "border-none"
                    }`}
                  >
                    <p className="sm:text-right text-gray-800">
                      {formatAmount(item.total, details.currency)}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="sm:hidden border-b border-gray-200"></div>
          </div>
        </div>

        <div className="mt-2 flex sm:justify-end">
          <div className="w-full max-w-2xl sm:text-right space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-medium text-gray-800">
                  Subtotal
                </dt>
                <dd className="col-span-2 text-gray-700">
                  {formatAmount(details.subTotal, details.currency)}
                </dd>
              </dl>
              {details.discountDetails?.amount != undefined &&
                details.discountDetails?.amount > 0 && (
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-medium text-gray-800">
                      Discount
                    </dt>
                    <dd className="col-span-2 text-gray-700">
                      {details.discountDetails.amountType === "amount"
                        ? `- ${formatAmount(
                            details.discountDetails.amount,
                            details.currency
                          )}`
                        : `- ${details.discountDetails.amount}%`}
                    </dd>
                  </dl>
                )}
              {details.taxDetails?.amount != undefined &&
                details.taxDetails?.amount > 0 && (
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-medium text-gray-800">
                      Tax
                    </dt>
                    <dd className="col-span-2 text-gray-700">
                      {details.taxDetails.amountType === "amount"
                        ? `+ ${formatAmount(
                            details.taxDetails.amount,
                            details.currency
                          )}`
                        : `+ ${details.taxDetails.amount}%`}
                    </dd>
                  </dl>
                )}
              {details.shippingDetails?.cost != undefined &&
                details.shippingDetails?.cost > 0 && (
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-medium text-gray-800">
                      Shipping
                    </dt>
                    <dd className="col-span-2 text-gray-700">
                      {details.shippingDetails.costType === "amount"
                        ? `+ ${formatAmount(
                            details.shippingDetails.cost,
                            details.currency
                          )}`
                        : `+ ${details.shippingDetails.cost}%`}
                    </dd>
                  </dl>
                )}
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-medium text-gray-800">Total</dt>
                <dd className="col-span-2 text-gray-700">
                  {formatAmount(details.totalAmount, details.currency)}
                </dd>
              </dl>
              {details.totalAmountInWords && (
                <dl className="grid sm:grid-cols-5 gap-x-3">
                  <dt className="col-span-3 font-medium text-gray-800">
                    Total in words
                  </dt>
                  <dd className="col-span-2 text-gray-700">
                    <em>
                      {details.totalAmountInWords} {details.currency}
                    </em>
                  </dd>
                </dl>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="my-4">
            {details.additionalNotes && (
              <div className="my-2">
                <p className="font-medium text-green-600">
                  Notes / Payment Details
                </p>
                <p className="font-regular text-gray-800">
                  {details.additionalNotes}
                </p>
              </div>
            )}
            {details.paymentTerms && (
              <div className="my-4">
                <p className="font-medium text-green-600">Payment Terms</p>
                <p className="font-regular text-gray-800">
                  {details.paymentTerms}
                </p>
              </div>
            )}
            {details.paymentInformation?.bankName && (
              <div className="my-2">
                <span className="font-medium text-md text-gray-800">
                  Please send the payment to this address
                  <p className="text-sm">
                    Bank: {details.paymentInformation?.bankName}
                  </p>
                  <p className="text-sm">
                    Account name: {details.paymentInformation?.accountName}
                  </p>
                  <p className="text-sm">
                    Account no: {details.paymentInformation?.accountNumber}
                  </p>
                </span>
              </div>
            )}
          </div>
          {sender.email && (
            <p className="text-gray-700 text-sm">
              If you have any questions regarding this invoice, please contact{" "}
              {sender.name} at{" "}
              <span className="text-gray-800 font-medium">{sender.email}</span>
              {sender.phone && (
                <span>
                  {" "}
                  or{" "}
                  <span className="text-gray-800 font-medium">
                    {sender.phone}
                  </span>
                </span>
              )}
              .
            </p>
          )}
        </div>

        {/* Signature */}
        {details?.signature?.data && isDataUrl(details?.signature?.data) ? (
          <div className="mt-6">
            <p className="font-medium text-gray-800">Signature:</p>
            <img
              src={details.signature.data}
              width={120}
              height={60}
              alt={`Signature of ${sender.name}`}
            />
          </div>
        ) : details.signature?.data ? (
          <div className="mt-6">
            <p className="text-gray-800">Signature:</p>
            <p
              style={{
                fontSize: 30,
                fontWeight: 400,
                fontFamily: `${details.signature.fontFamily}, cursive`,
                color: "black",
              }}
            >
              {details.signature.data}
            </p>
          </div>
        ) : null}
        <div className="mt-16 text-center text-sm font-medium text-gray-600 max-w-max mx-auto py-0.5 px-2">
          Invoiced with{" "}
          <a
            href="https://www.timenavi.com"
            className="text-green-600 font-semibold"
            style={{ fontFamily: "Mulish, sans-serif" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            TimeNavi
          </a>
        </div>
    </InvoiceLayout>
  );
};

export default InvoiceTemplate3;
