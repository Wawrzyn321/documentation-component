// https://github.com/SAP-samples/xf-application-mocks/blob/master/commerce-mock/apis/ordermanagementwebservices.yaml

export default `swagger: "2.0"
info:
  description: "Order Management Webservices Version 2"
  version: "6.5.0"
  title: "Order Management Module V2"
tags:
  - name: "oms-returns-controller"
    description: "Returns Operations"
  - name: "oms-orders-controller"
    description: "Orders Operations"
basePath: "/ordermanagementwebservices"
paths:
  /orders:
    get:
      tags:
        - "oms-orders-controller"
      summary: "Finds all orders in the system"
      operationId: "getOrdersUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
        - name: "currentPage"
          in: "query"
          description: "Current page number"
          required: false
          type: "integer"
          default: 0
          format: "int32"
        - name: "pageSize"
          in: "query"
          description: "Number of items to be displayed per page"
          required: false
          type: "integer"
          default: 10
          format: "int32"
        - name: "sort"
          in: "query"
          description: "Method in which to sort results"
          required: false
          type: "string"
          default: "asc"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/OrderSearchPageWsDto"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
    post:
      tags:
        - "oms-orders-controller"
      summary: "Submits an order to the system"
      operationId: "submitOrderUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - in: "body"
          name: "orderRequestWsDTO"
          description: "The OrderRequestWsDTO that contains all information for a new order"
          required: true
          schema:
            $ref: "#/definitions/OrderRequestWsDTO"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
      responses:
        201:
          description: "Created"
          schema:
            $ref: "#/definitions/OrderWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /orders/cancel-reasons:
    get:
      tags:
        - "oms-orders-controller"
      summary: "Finds a list of all cancellation reasons"
      operationId: "getCancelReasonUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/CancelReasonListWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /orders/status/{orderStatuses}:
    get:
      tags:
        - "oms-orders-controller"
      summary: "Finds a paginated list of orders for a given set of order statuses"
      operationId: "getOrdersByStatusUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "orderStatuses"
          in: "path"
          description: "List of desired order statuses"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
        - name: "currentPage"
          in: "query"
          description: "Current page number"
          required: false
          type: "integer"
          default: 0
          format: "int32"
        - name: "pageSize"
          in: "query"
          description: "Number of items to be displayed per page"
          required: false
          type: "integer"
          default: 10
          format: "int32"
        - name: "sort"
          in: "query"
          description: "Method in which to sort results"
          required: false
          type: "string"
          default: "asc"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/OrderSearchPageWsDto"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /orders/statuses:
    get:
      tags:
        - "oms-orders-controller"
      summary: "Finds a list of all possible order statuses in the system"
      operationId: "getOrderStatusesUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/OrderStatusListWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /orders/{code}:
    get:
      tags:
        - "oms-orders-controller"
      summary: "Finds a single order by a given order code"
      operationId: "getOrderForCodeUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "The order code"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/OrderWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /orders/{code}/cancel:
    post:
      tags:
        - "oms-orders-controller"
      summary: "Creates an order cancellation in the system"
      operationId: "createCancelRequestUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - in: "body"
          name: "orderCancelRequestWsDTO"
          description: "The OrderCancelRequestWsDTO holding the information of the order we want to cancel"
          required: true
          schema:
            $ref: "#/definitions/OrderCancelRequestWsDTO"
        - name: "code"
          in: "path"
          description: "Order code"
          required: true
          type: "string"
      responses:
        201:
          description: "Created"
          schema:
            $ref: "#/definitions/OrderCancelRequestData"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /orders/{code}/entries:
    get:
      tags:
        - "oms-orders-controller"
      summary: "Finds a paginated list of order entries for the order with the given code"
      operationId: "getOrderEntriesForOrderCodeUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "Order code"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
        - name: "currentPage"
          in: "query"
          description: "Current page number"
          required: false
          type: "integer"
          default: 0
          format: "int32"
        - name: "pageSize"
          in: "query"
          description: "Number of items to display per page"
          required: false
          type: "integer"
          default: 10
          format: "int32"
        - name: "sort"
          in: "query"
          description: "Method in which to sort results"
          required: false
          type: "string"
          default: "asc"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/OrderEntrySearchPageWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /orders/{code}/entries/{entryNumber}:
    get:
      tags:
        - "oms-orders-controller"
      summary: "Finds the order entry corresponding to the given entry number for the order with the given code"
      operationId: "getOrderEntryForOrderCodeAndEntryNumberUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "Order code"
          required: true
          type: "string"
        - name: "entryNumber"
          in: "path"
          description: "Order entry number"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/OrderEntryWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /orders/{code}/fraud-reports:
    get:
      tags:
        - "oms-orders-controller"
      summary: "Finds a list of all fraud reports for an order with the given code"
      operationId: "getOrderFraudReportsUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "Order code"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/FraudReportListWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /orders/{code}/fraud-reports/approve:
    post:
      tags:
        - "oms-orders-controller"
      summary: "Approves an order that could potentially be fraudulent"
      operationId: "approvePotentiallyFraudulentOrderUsingPOST"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "Order code"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /orders/{code}/fraud-reports/reject:
    post:
      tags:
        - "oms-orders-controller"
      summary: "Rejects an order that could be potentially fraudulent"
      operationId: "rejectPotentiallyFraudulentOrderUsingPOST"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "Order code"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /orders/{code}/manual/commit-tax:
    post:
      tags:
        - "oms-orders-controller"
      summary: "Moves an order out of the waiting step after tax commit has failed."
      operationId: "manuallyReleaseTaxCommitUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - name: "code"
          in: "path"
          description: "code"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /orders/{code}/manual/delivery-cost-commit:
    post:
      tags:
        - "oms-orders-controller"
      summary: "Moves an order out of the waiting step after delivery cost tax commit has failed, indicating tax was committed."
      operationId: "manuallyReleaseDeliveryCostCommitUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - name: "code"
          in: "path"
          description: "Order code"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /orders/{code}/manual/reauth-payment:
    post:
      tags:
        - "oms-orders-controller"
      summary: "Moves an order out of the waiting step after payment reauthorization has failed, indicating payment was reauthorized."
      operationId: "manuallyReleasePaymentReauthUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - name: "code"
          in: "path"
          description: "Order code"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /orders/{code}/manual/requote-tax:
    post:
      tags:
        - "oms-orders-controller"
      summary: "Moves an order out of the waiting step after tax requote has failed."
      operationId: "manuallyReleaseTaxRequoteUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - name: "code"
          in: "path"
          description: "code"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /orders/{code}/manual/void-payment:
    post:
      tags:
        - "oms-orders-controller"
      summary: "Moves an order out of the waiting step after payment authorization cancellation has failed, indicating payment was voided."
      operationId: "manuallyReleasePaymentVoidUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - name: "code"
          in: "path"
          description: "Order code"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /orders/{code}/manual/void-tax:
    post:
      tags:
        - "oms-orders-controller"
      summary: "Moves an order out of the waiting step after tax post void has failed."
      operationId: "manuallyReleaseTaxVoidUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - name: "code"
          in: "path"
          description: "code"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /returns:
    get:
      tags:
        - "oms-returns-controller"
      summary: "Finds a paginated list of all the returns in the system"
      operationId: "getReturnsUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
        - name: "currentPage"
          in: "query"
          description: "Current page number"
          required: false
          type: "integer"
          default: 0
          format: "int32"
        - name: "pageSize"
          in: "query"
          description: "Number of items to be displayed per page"
          required: false
          type: "integer"
          default: 10
          format: "int32"
        - name: "sort"
          in: "query"
          description: "Method in which to sort results"
          required: false
          type: "string"
          default: "asc"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/ReturnSearchPageWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
    post:
      tags:
        - "oms-returns-controller"
      summary: "Creates a return request"
      operationId: "createReturnRequestUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - in: "body"
          name: "returnRequestWsDTO"
          description: "The ReturnRequestWsDTO holding all required information to create a return request"
          required: true
          schema:
            $ref: "#/definitions/ReturnRequestWsDTO"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
      responses:
        201:
          description: "Created"
          schema:
            $ref: "#/definitions/ReturnRequestWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /returns/actions:
    get:
      tags:
        - "oms-returns-controller"
      summary: "Finds a list of all possble return actions"
      operationId: "getReturnActionsUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/ReturnActionListWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /returns/cancel:
    post:
      tags:
        - "oms-returns-controller"
      summary: "Cancels a return request"
      operationId: "cancelReturnRequestUsingPOST"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - in: "body"
          name: "cancelReturnRequestWsDTO"
          description: "The CancelReturnRequestWsDTO containing information about the return request cancellation"
          required: true
          schema:
            $ref: "#/definitions/CancelReturnRequestWsDTO"
      responses:
        200:
          description: "OK"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /returns/cancel-reasons:
    get:
      tags:
        - "oms-returns-controller"
      summary: "Finds a list of all possible return cancellation reasons"
      operationId: "getReturnsCancellationReasonsUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/CancelReasonListWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /returns/refund-reasons:
    get:
      tags:
        - "oms-returns-controller"
      summary: "Finds a list of all possible refund reasons"
      operationId: "getRefundReasonsUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/RefundReasonListWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /returns/status/{returnStatuses}:
    get:
      tags:
        - "oms-returns-controller"
      summary: "Finds a paginated list of returns with one of a set of desired statuses"
      operationId: "getReturnsByStatusUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "returnStatuses"
          in: "path"
          description: "Set of desired return statuses"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
        - name: "currentPage"
          in: "query"
          description: "Current page number"
          required: false
          type: "integer"
          default: 0
          format: "int32"
        - name: "pageSize"
          in: "query"
          description: "Number of items to be displayed per page"
          required: false
          type: "integer"
          default: 10
          format: "int32"
        - name: "sort"
          in: "query"
          description: "Method in which to sort results"
          required: false
          type: "string"
          default: "asc"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/ReturnSearchPageWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /returns/statuses:
    get:
      tags:
        - "oms-returns-controller"
      summary: "Finds a list of all return possible return statuses"
      operationId: "getReturnStatusesUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/ReturnStatusListWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /returns/{code}:
    get:
      tags:
        - "oms-returns-controller"
      summary: "Finds a specific return request by its code"
      operationId: "getReturnForReturnCodeUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "Return request code"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/ReturnRequestWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
    put:
      tags:
        - "oms-returns-controller"
      summary: "Updates a return request corresponding to the given code with the modifications provided"
      operationId: "updateReturnByReturnCodeUsingPUT"
      consumes:
        - "application/xml"
        - "application/json"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - in: "body"
          name: "returnRequestModificationWsDTO"
          description: "The ReturnRequestModificationWsDTO containing the desired modifications to be applied"
          required: true
          schema:
            $ref: "#/definitions/ReturnRequestModificationWsDTO"
        - name: "code"
          in: "path"
          description: "Return request code"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/ReturnRequestWsDTO"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /returns/{code}/approve:
    post:
      tags:
        - "oms-returns-controller"
      summary: "Approves a return request corresponding to the given code"
      operationId: "approveReturnRequestUsingPOST"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "Return request code"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /returns/{code}/entries:
    get:
      tags:
        - "oms-returns-controller"
      summary: "Finds a paginated list of return entries for a return request corresponding to the given code"
      operationId: "getReturnEntriesForOrderCodeUsingGET"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "Return request code"
          required: true
          type: "string"
        - name: "fields"
          in: "query"
          description: "Fields mapping level"
          required: false
          type: "string"
          default: "DEFAULT"
        - name: "currentPage"
          in: "query"
          description: "Current page number"
          required: false
          type: "integer"
          default: 0
          format: "int32"
        - name: "pageSize"
          in: "query"
          description: "Number of items to display per page"
          required: false
          type: "integer"
          default: 10
          format: "int32"
        - name: "sort"
          in: "query"
          description: "Method in which to sort results"
          required: false
          type: "string"
          default: "asc"
      responses:
        200:
          description: "OK"
          schema:
            $ref: "#/definitions/ReturnEntrySearchPageWsDTO"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /returns/{code}/manual/reverse-payment:
    post:
      tags:
        - "oms-returns-controller"
      summary: "Requests manual reversal of the payment for a return"
      operationId: "manuallyReversePaymentUsingPOST"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "Return request code"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /returns/{code}/manual/reverse-tax:
    post:
      tags:
        - "oms-returns-controller"
      summary: "Requests manual reversal of the taxes for a return"
      operationId: "manuallyReverseTaxUsingPOST"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "Return request code"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
  /returns/{code}/reverse-payment:
    post:
      tags:
        - "oms-returns-controller"
      summary: "Requests manual reversal of the payment for a return"
      operationId: "requestManualPaymentReversalForReturnRequestUsingPOST"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "Return request code"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
      deprecated: true
  /returns/{code}/reverse-tax:
    post:
      tags:
        - "oms-returns-controller"
      summary: "Requests manual reversal of the taxes for a return"
      operationId: "requestManualTaxReversalForReturnRequestUsingPOST"
      consumes:
        - "application/json"
      produces:
        - "*/*"
      parameters:
        - name: "code"
          in: "path"
          description: "Return request code"
          required: true
          type: "string"
      responses:
        200:
          description: "OK"
        201:
          description: "Created"
        401:
          description: "Unauthorized"
        403:
          description: "Forbidden"
        404:
          description: "Not Found"
      deprecated: true
  /authorizationserver/oauth/token:
    post:
      summary: "Get OAuth2 access token"
      description: "Returns the acess token for Kyma"
      consumes:
        - "application/x-www-form-urlencoded"
      produces:
        - "application/xml"
        - "application/json"
      parameters:
        - in: "body"
          name: "parameters"
          description: "List of Component identifiers"
          required: true
          schema:
            type: "object"
            properties:
              client_id:
                type: "string"
              client_secret:
                type: "string"
              grant_type:
                type: "string"
      responses:
        200:
          description: "OK"
          schema:
            type: "object"
            properties:
              access_token_url:
                type: "string"
            default:
              token: "3333"
        404:
          description: "Not Found"
definitions:
  AddressWsDTO:
    type: "object"
    properties:
      companyName:
        type: "string"
      country:
        $ref: "#/definitions/CountryWsDTO"
      defaultAddress:
        type: "boolean"
      email:
        type: "string"
      firstName:
        type: "string"
      formattedAddress:
        type: "string"
      id:
        type: "string"
      lastName:
        type: "string"
      line1:
        type: "string"
      line2:
        type: "string"
      phone:
        type: "string"
      postalCode:
        type: "string"
      region:
        $ref: "#/definitions/RegionWsDTO"
      shippingAddress:
        type: "boolean"
      title:
        type: "string"
      titleCode:
        type: "string"
      town:
        type: "string"
      visibleInAddressBook:
        type: "boolean"
  BaseOptionWsDTO:
    type: "object"
    properties:
      options:
        type: "array"
        items:
          $ref: "#/definitions/VariantOptionWsDTO"
      selected:
        $ref: "#/definitions/VariantOptionWsDTO"
      variantType:
        type: "string"
  CancelReason:
    type: "object"
    properties:
      code:
        type: "string"
      type:
        type: "string"
  CancelReasonListWsDTO:
    type: "object"
    properties:
      reasons:
        type: "array"
        items:
          type: "string"
  CancelReturnRequestWsDTO:
    type: "object"
    properties:
      cancelReason:
        type: "string"
      code:
        type: "string"
      notes:
        type: "string"
  CardTypeWsDTO:
    type: "object"
    properties:
      code:
        type: "string"
      name:
        type: "string"
  CategoryWsDTO:
    type: "object"
    properties:
      code:
        type: "string"
      image:
        $ref: "#/definitions/ImageWsDTO"
      url:
        type: "string"
  ClassificationWsDTO:
    type: "object"
    properties:
      code:
        type: "string"
      features:
        type: "array"
        items:
          $ref: "#/definitions/FeatureWsDTO"
      name:
        type: "string"
  ConfigurationInfoWsDTO:
    type: "object"
    properties:
      configurationLabel:
        type: "string"
      configurationValue:
        type: "string"
      configuratorType:
        type: "string"
      status:
        type: "string"
  ConsignmentEntryWsDTO:
    type: "object"
    properties:
      orderEntry:
        $ref: "#/definitions/OrderEntryWsDTO"
      quantity:
        type: "integer"
        format: "int64"
      quantityDeclined:
        type: "integer"
        format: "int64"
      quantityPending:
        type: "integer"
        format: "int64"
      quantityShipped:
        type: "integer"
        format: "int64"
      shippedQuantity:
        type: "integer"
        format: "int64"
  ConsignmentWsDTO:
    type: "object"
    properties:
      code:
        type: "string"
      deliveryMode:
        $ref: "#/definitions/DeliveryModeWsDTO"
      deliveryPointOfService:
        $ref: "#/definitions/PointOfServiceWsDTO"
      entries:
        type: "array"
        items:
          $ref: "#/definitions/ConsignmentEntryWsDTO"
      orderCode:
        type: "string"
      packagingInfo:
        $ref: "#/definitions/PackagingInfoWsDTO"
      shippingAddress:
        $ref: "#/definitions/AddressWsDTO"
      shippingDate:
        type: "string"
        format: "date-time"
      status:
        type: "string"
      statusDate:
        type: "string"
        format: "date-time"
      trackingID:
        type: "string"
      warehouseCode:
        type: "string"
  CountryWsDTO:
    type: "object"
    properties:
      isocode:
        type: "string"
      name:
        type: "string"
  CurrencyWsDTO:
    type: "object"
    properties:
      active:
        type: "boolean"
      isocode:
        type: "string"
      name:
        type: "string"
      symbol:
        type: "string"
  DeliveryModeWsDTO:
    type: "object"
    properties:
      code:
        type: "string"
      deliveryCost:
        $ref: "#/definitions/PriceWsDTO"
      description:
        type: "string"
      name:
        type: "string"
  DeliveryOrderEntryGroupWsDTO:
    type: "object"
    properties:
      deliveryAddress:
        $ref: "#/definitions/AddressWsDTO"
      entries:
        type: "array"
        items:
          $ref: "#/definitions/OrderEntryWsDTO"
      quantity:
        type: "integer"
        format: "int64"
      totalPriceWithTax:
        $ref: "#/definitions/PriceWsDTO"
  FeatureUnitWsDTO:
    type: "object"
    properties:
      name:
        type: "string"
      symbol:
        type: "string"
      unitType:
        type: "string"
  FeatureValueWsDTO:
    type: "object"
    properties:
      value:
        type: "string"
  FeatureWsDTO:
    type: "object"
    properties:
      code:
        type: "string"
      comparable:
        type: "boolean"
      description:
        type: "string"
      featureUnit:
        $ref: "#/definitions/FeatureUnitWsDTO"
      featureValues:
        type: "array"
        items:
          $ref: "#/definitions/FeatureValueWsDTO"
      name:
        type: "string"
      range:
        type: "boolean"
      type:
        type: "string"
  FraudReportListWsDTO:
    type: "object"
    properties:
      reports:
        type: "array"
        items:
          $ref: "#/definitions/FraudReportWsDTO"
  FraudReportWsDTO:
    type: "object"
    properties:
      explanation:
        type: "string"
      fraudSymptomScorings:
        type: "array"
        items:
          $ref: "#/definitions/FraudSymptomScoringsWsDTO"
      provider:
        type: "string"
      status:
        type: "string"
      timestamp:
        type: "string"
        format: "date-time"
  FraudSymptomScoringsWsDTO:
    type: "object"
    properties:
      explanation:
        type: "string"
      name:
        type: "string"
      score:
        type: "number"
        format: "double"
  FutureStockWsDTO:
    type: "object"
    properties:
      date:
        type: "string"
        format: "date-time"
      formattedDate:
        type: "string"
      stock:
        $ref: "#/definitions/StockWsDTO"
  GeoPointWsDTO:
    type: "object"
    properties:
      latitude:
        type: "number"
        format: "double"
      longitude:
        type: "number"
        format: "double"
  ImageWsDTO:
    type: "object"
    properties:
      altText:
        type: "string"
      format:
        type: "string"
      galleryIndex:
        type: "integer"
        format: "int32"
      imageType:
        type: "string"
        enum:
          - "PRIMARY"
          - "GALLERY"
      url:
        type: "string"
  LanguageWsDTO:
    type: "object"
    properties:
      active:
        type: "boolean"
      isocode:
        type: "string"
      name:
        type: "string"
      nativeName:
        type: "string"
  OpeningScheduleWsDTO:
    type: "object"
    properties:
      code:
        type: "string"
      name:
        type: "string"
      specialDayOpeningList:
        type: "array"
        items:
          $ref: "#/definitions/SpecialOpeningDayWsDTO"
      weekDayOpeningList:
        type: "array"
        items:
          $ref: "#/definitions/WeekdayOpeningDayWsDTO"
  OrderCancelEntryData:
    type: "object"
    properties:
      cancelQuantity:
        type: "integer"
        format: "int64"
      cancelReason:
        $ref: "#/definitions/CancelReason"
      notes:
        type: "string"
      orderEntryNumber:
        type: "integer"
        format: "int32"
  OrderCancelEntryWsDTO:
    type: "object"
    properties:
      cancelQuantity:
        type: "integer"
        format: "int64"
      cancelReason:
        type: "string"
      notes:
        type: "string"
      orderEntryNumber:
        type: "string"
  OrderCancelRequestData:
    type: "object"
    properties:
      entries:
        type: "array"
        items:
          $ref: "#/definitions/OrderCancelEntryData"
      orderCode:
        type: "string"
      userId:
        type: "string"
  OrderCancelRequestWsDTO:
    type: "object"
    properties:
      entries:
        type: "array"
        items:
          $ref: "#/definitions/OrderCancelEntryWsDTO"
      userId:
        type: "string"
  OrderEntryRequestWsDTO:
    type: "object"
    properties:
      basePrice:
        type: "number"
        format: "double"
      deliveryModeCode:
        type: "string"
      deliveryPointOfService:
        type: "string"
      entryNumber:
        type: "string"
      productCode:
        type: "string"
      quantity:
        type: "integer"
        format: "int64"
      totalPrice:
        type: "number"
        format: "double"
      unitCode:
        type: "string"
  OrderEntrySearchPageWsDTO:
    type: "object"
    properties:
      orderEntries:
        type: "array"
        items:
          $ref: "#/definitions/OrderEntryWsDTO"
      pagination:
        $ref: "#/definitions/PaginationWsDTO"
      sorts:
        type: "array"
        items:
          $ref: "#/definitions/SortWsDTO"
  OrderEntryWsDTO:
    type: "object"
    properties:
      basePrice:
        $ref: "#/definitions/PriceWsDTO"
      configurationInfos:
        type: "array"
        items:
          $ref: "#/definitions/ConfigurationInfoWsDTO"
      deliveryMode:
        $ref: "#/definitions/DeliveryModeWsDTO"
      deliveryPointOfService:
        $ref: "#/definitions/PointOfServiceWsDTO"
      entryNumber:
        type: "integer"
        format: "int32"
      product:
        $ref: "#/definitions/ProductWsDTO"
      quantity:
        type: "integer"
        format: "int64"
      quantityAllocated:
        type: "integer"
        format: "int64"
      quantityCancelled:
        type: "integer"
        format: "int64"
      quantityPending:
        type: "integer"
        format: "int64"
      quantityReturned:
        type: "integer"
        format: "int64"
      quantityShipped:
        type: "integer"
        format: "int64"
      quantityUnallocated:
        type: "integer"
        format: "int64"
      totalPrice:
        $ref: "#/definitions/PriceWsDTO"
      updateable:
        type: "boolean"
      url:
        type: "string"
  OrderRequestWsDTO:
    type: "object"
    properties:
      allPromotionResults:
        type: "array"
        items:
          $ref: "#/definitions/PromotionResultWsDTO"
      calculated:
        type: "boolean"
      currencyIsocode:
        type: "string"
      deliveryAddress:
        $ref: "#/definitions/AddressWsDTO"
      deliveryCost:
        type: "number"
        format: "double"
      deliveryModeCode:
        type: "string"
      deliveryStatus:
        type: "string"
      description:
        type: "string"
      entries:
        type: "array"
        items:
          $ref: "#/definitions/OrderEntryRequestWsDTO"
      expirationTime:
        type: "string"
        format: "date-time"
      externalOrderCode:
        type: "string"
      guid:
        type: "string"
      languageIsocode:
        type: "string"
      name:
        type: "string"
      net:
        type: "boolean"
      paymentAddress:
        $ref: "#/definitions/AddressWsDTO"
      paymentTransactions:
        type: "array"
        items:
          $ref: "#/definitions/PaymentTransactionWsDTO"
      siteUid:
        type: "string"
      storeUid:
        type: "string"
      subtotal:
        type: "number"
        format: "double"
      totalPrice:
        type: "number"
        format: "double"
      totalTax:
        type: "number"
        format: "double"
      user:
        $ref: "#/definitions/UserWsDTO"
  OrderSearchPageWsDto:
    type: "object"
    properties:
      orders:
        type: "array"
        items:
          $ref: "#/definitions/OrderWsDTO"
      pagination:
        $ref: "#/definitions/PaginationWsDTO"
      sorts:
        type: "array"
        items:
          $ref: "#/definitions/SortWsDTO"
  OrderStatusListWsDTO:
    type: "object"
    properties:
      statuses:
        type: "array"
        items:
          type: "string"
  OrderWsDTO:
    type: "object"
    properties:
      appliedOrderPromotions:
        type: "array"
        items:
          $ref: "#/definitions/PromotionResultWsDTO"
      appliedProductPromotions:
        type: "array"
        items:
          $ref: "#/definitions/PromotionResultWsDTO"
      appliedVouchers:
        type: "array"
        items:
          $ref: "#/definitions/VoucherWsDTO"
      calculated:
        type: "boolean"
      code:
        type: "string"
      consignments:
        type: "array"
        items:
          $ref: "#/definitions/ConsignmentWsDTO"
      created:
        type: "string"
        format: "date-time"
      deliveryAddress:
        $ref: "#/definitions/AddressWsDTO"
      deliveryCost:
        $ref: "#/definitions/PriceWsDTO"
      deliveryItemsQuantity:
        type: "integer"
        format: "int64"
      deliveryMode:
        $ref: "#/definitions/DeliveryModeWsDTO"
      deliveryOrderGroups:
        type: "array"
        items:
          $ref: "#/definitions/DeliveryOrderEntryGroupWsDTO"
      deliveryStatus:
        type: "string"
      deliveryStatusDisplay:
        type: "string"
      entries:
        type: "array"
        items:
          $ref: "#/definitions/OrderEntryWsDTO"
      guestCustomer:
        type: "boolean"
      guid:
        type: "string"
      net:
        type: "boolean"
      orderDiscounts:
        $ref: "#/definitions/PriceWsDTO"
      paymentAddress:
        $ref: "#/definitions/AddressWsDTO"
      paymentInfo:
        $ref: "#/definitions/PaymentDetailsWsDTO"
      pickupItemsQuantity:
        type: "integer"
        format: "int64"
      pickupOrderGroups:
        type: "array"
        items:
          $ref: "#/definitions/PickupOrderEntryGroupWsDTO"
      productDiscounts:
        $ref: "#/definitions/PriceWsDTO"
      site:
        type: "string"
      status:
        type: "string"
      statusDisplay:
        type: "string"
      store:
        type: "string"
      subTotal:
        $ref: "#/definitions/PriceWsDTO"
      totalDiscounts:
        $ref: "#/definitions/PriceWsDTO"
      totalItems:
        type: "integer"
        format: "int32"
      totalPrice:
        $ref: "#/definitions/PriceWsDTO"
      totalPriceWithTax:
        $ref: "#/definitions/PriceWsDTO"
      totalTax:
        $ref: "#/definitions/PriceWsDTO"
      unconsignedEntries:
        type: "array"
        items:
          $ref: "#/definitions/OrderEntryWsDTO"
      user:
        $ref: "#/definitions/PrincipalWsDTO"
  PackagingInfoWsDTO:
    type: "object"
    properties:
      dimensionUnit:
        type: "string"
      grossWeight:
        type: "string"
      height:
        type: "string"
      insuredValue:
        type: "string"
      length:
        type: "string"
      weightUnit:
        type: "string"
      width:
        type: "string"
  PaginationWsDTO:
    type: "object"
    properties:
      currentPage:
        type: "integer"
        format: "int32"
      pageSize:
        type: "integer"
        format: "int32"
      sort:
        type: "string"
      totalPages:
        type: "integer"
        format: "int32"
      totalResults:
        type: "integer"
        format: "int64"
  PaymentDetailsWsDTO:
    type: "object"
    properties:
      accountHolderName:
        type: "string"
      billingAddress:
        $ref: "#/definitions/AddressWsDTO"
      cardNumber:
        type: "string"
      cardType:
        $ref: "#/definitions/CardTypeWsDTO"
      defaultPayment:
        type: "boolean"
      expiryMonth:
        type: "string"
      expiryYear:
        type: "string"
      id:
        type: "string"
      issueNumber:
        type: "string"
      saved:
        type: "boolean"
      startMonth:
        type: "string"
      startYear:
        type: "string"
      subscriptionId:
        type: "string"
  PaymentTransactionEntryWsDTO:
    type: "object"
    properties:
      amount:
        type: "number"
      code:
        type: "string"
      currencyIsocode:
        type: "string"
      requestId:
        type: "string"
      requestToken:
        type: "string"
      subscriptionID:
        type: "string"
      time:
        type: "string"
        format: "date-time"
      transactionStatus:
        type: "string"
      transactionStatusDetails:
        type: "string"
      type:
        type: "string"
      versionID:
        type: "string"
  PaymentTransactionWsDTO:
    type: "object"
    properties:
      code:
        type: "string"
      currencyIsocode:
        type: "string"
      entries:
        type: "array"
        items:
          $ref: "#/definitions/PaymentTransactionEntryWsDTO"
      paymentInfo:
        $ref: "#/definitions/PaymentDetailsWsDTO"
      paymentProvider:
        type: "string"
      plannedAmount:
        type: "number"
      requestId:
        type: "string"
      requestToken:
        type: "string"
      versionID:
        type: "string"
  PickupOrderEntryGroupWsDTO:
    type: "object"
    properties:
      deliveryPointOfService:
        $ref: "#/definitions/PointOfServiceWsDTO"
      distance:
        type: "number"
        format: "double"
      entries:
        type: "array"
        items:
          $ref: "#/definitions/OrderEntryWsDTO"
      quantity:
        type: "integer"
        format: "int64"
      totalPriceWithTax:
        $ref: "#/definitions/PriceWsDTO"
  PointOfServiceWsDTO:
    type: "object"
    properties:
      address:
        $ref: "#/definitions/AddressWsDTO"
      description:
        type: "string"
      displayName:
        type: "string"
      distanceKm:
        type: "number"
        format: "double"
      features:
        type: "object"
        additionalProperties:
          type: "string"
      formattedDistance:
        type: "string"
      geoPoint:
        $ref: "#/definitions/GeoPointWsDTO"
      mapIcon:
        $ref: "#/definitions/ImageWsDTO"
      name:
        type: "string"
      openingHours:
        $ref: "#/definitions/OpeningScheduleWsDTO"
      storeContent:
        type: "string"
      storeImages:
        type: "array"
        items:
          $ref: "#/definitions/ImageWsDTO"
      url:
        type: "string"
      warehouseCodes:
        type: "array"
        items:
          type: "string"
  PriceRangeWsDTO:
    type: "object"
    properties:
      maxPrice:
        $ref: "#/definitions/PriceWsDTO"
      minPrice:
        $ref: "#/definitions/PriceWsDTO"
  PriceWsDTO:
    type: "object"
    properties:
      currencyIso:
        type: "string"
      formattedValue:
        type: "string"
      maxQuantity:
        type: "integer"
        format: "int64"
      minQuantity:
        type: "integer"
        format: "int64"
      priceType:
        type: "string"
        enum:
          - "BUY"
          - "FROM"
      value:
        type: "number"
  PrincipalWsDTO:
    type: "object"
    properties:
      name:
        type: "string"
      uid:
        type: "string"
  ProductReferenceWsDTO:
    type: "object"
    properties:
      description:
        type: "string"
      preselected:
        type: "boolean"
      quantity:
        type: "integer"
        format: "int32"
      referenceType:
        type: "string"
  ProductWsDTO:
    type: "object"
    properties:
      availableForPickup:
        type: "boolean"
      averageRating:
        type: "number"
        format: "double"
      baseOptions:
        type: "array"
        items:
          $ref: "#/definitions/BaseOptionWsDTO"
      baseProduct:
        type: "string"
      categories:
        type: "array"
        items:
          $ref: "#/definitions/CategoryWsDTO"
      classifications:
        type: "array"
        items:
          $ref: "#/definitions/ClassificationWsDTO"
      code:
        type: "string"
      configurable:
        type: "boolean"
      configuratorType:
        type: "string"
      description:
        type: "string"
      futureStocks:
        type: "array"
        items:
          $ref: "#/definitions/FutureStockWsDTO"
      images:
        type: "array"
        items:
          $ref: "#/definitions/ImageWsDTO"
      manufacturer:
        type: "string"
      multidimensional:
        type: "boolean"
      name:
        type: "string"
      numberOfReviews:
        type: "integer"
        format: "int32"
      potentialPromotions:
        type: "array"
        items:
          $ref: "#/definitions/PromotionWsDTO"
      price:
        $ref: "#/definitions/PriceWsDTO"
      priceRange:
        $ref: "#/definitions/PriceRangeWsDTO"
      productReferences:
        type: "array"
        items:
          $ref: "#/definitions/ProductReferenceWsDTO"
      purchasable:
        type: "boolean"
      reviews:
        type: "array"
        items:
          $ref: "#/definitions/ReviewWsDTO"
      stock:
        $ref: "#/definitions/StockWsDTO"
      summary:
        type: "string"
      tags:
        type: "array"
        items:
          type: "string"
      url:
        type: "string"
      variantMatrix:
        type: "array"
        items:
          $ref: "#/definitions/VariantMatrixElementWsDTO"
      variantOptions:
        type: "array"
        items:
          $ref: "#/definitions/VariantOptionWsDTO"
      variantType:
        type: "string"
      volumePrices:
        type: "array"
        items:
          $ref: "#/definitions/PriceWsDTO"
      volumePricesFlag:
        type: "boolean"
  PromotionOrderEntryConsumedWsDTO:
    type: "object"
    properties:
      adjustedUnitPrice:
        type: "number"
        format: "double"
      code:
        type: "string"
      orderEntryNumber:
        type: "integer"
        format: "int32"
      quantity:
        type: "integer"
        format: "int64"
  PromotionRestrictionWsDTO:
    type: "object"
    properties:
      description:
        type: "string"
      restrictionType:
        type: "string"
  PromotionResultWsDTO:
    type: "object"
    properties:
      consumedEntries:
        type: "array"
        items:
          $ref: "#/definitions/PromotionOrderEntryConsumedWsDTO"
      description:
        type: "string"
      promotion:
        $ref: "#/definitions/PromotionWsDTO"
  PromotionWsDTO:
    type: "object"
    properties:
      code:
        type: "string"
      couldFireMessages:
        type: "array"
        items:
          type: "string"
      description:
        type: "string"
      enabled:
        type: "boolean"
      endDate:
        type: "string"
        format: "date-time"
      firedMessages:
        type: "array"
        items:
          type: "string"
      priority:
        type: "integer"
        format: "int32"
      productBanner:
        $ref: "#/definitions/ImageWsDTO"
      promotionGroup:
        type: "string"
      promotionType:
        type: "string"
      restrictions:
        type: "array"
        items:
          $ref: "#/definitions/PromotionRestrictionWsDTO"
      startDate:
        type: "string"
        format: "date-time"
      title:
        type: "string"
  RefundReasonListWsDTO:
    type: "object"
    properties:
      refundReasons:
        type: "array"
        items:
          type: "string"
  RegionWsDTO:
    type: "object"
    properties:
      countryIso:
        type: "string"
      isocode:
        type: "string"
      isocodeShort:
        type: "string"
      name:
        type: "string"
  ReturnActionListWsDTO:
    type: "object"
    properties:
      returnActions:
        type: "array"
        items:
          type: "string"
  ReturnEntryModificationWsDTO:
    type: "object"
    properties:
      deliveryModeCode:
        type: "string"
      productCode:
        type: "string"
      refundAmount:
        type: "number"
  ReturnEntrySearchPageWsDTO:
    type: "object"
    properties:
      pagination:
        $ref: "#/definitions/PaginationWsDTO"
      returnEntries:
        type: "array"
        items:
          $ref: "#/definitions/ReturnEntryWsDTO"
      sorts:
        type: "array"
        items:
          $ref: "#/definitions/SortWsDTO"
  ReturnEntryWsDTO:
    type: "object"
    properties:
      action:
        type: "string"
      expectedQuantity:
        type: "integer"
        format: "int64"
      notes:
        type: "string"
      orderEntry:
        $ref: "#/definitions/OrderEntryWsDTO"
      reachedDate:
        type: "string"
        format: "date-time"
      receivedQuantity:
        type: "integer"
        format: "int64"
      refundAmount:
        $ref: "#/definitions/PriceWsDTO"
      refundReason:
        type: "string"
      refundedDate:
        type: "string"
        format: "date-time"
      replacementReason:
        type: "string"
  ReturnRequestModificationWsDTO:
    type: "object"
    properties:
      refundDeliveryCost:
        type: "boolean"
      returnEntries:
        type: "array"
        items:
          $ref: "#/definitions/ReturnEntryModificationWsDTO"
  ReturnRequestWsDTO:
    type: "object"
    properties:
      code:
        type: "string"
      deliveryCost:
        $ref: "#/definitions/PriceWsDTO"
      order:
        $ref: "#/definitions/OrderWsDTO"
      refundDeliveryCost:
        type: "boolean"
      returnEntries:
        type: "array"
        items:
          $ref: "#/definitions/ReturnEntryWsDTO"
      rma:
        type: "string"
      status:
        type: "string"
  ReturnSearchPageWsDTO:
    type: "object"
    properties:
      pagination:
        $ref: "#/definitions/PaginationWsDTO"
      returns:
        type: "array"
        items:
          $ref: "#/definitions/ReturnRequestWsDTO"
      sorts:
        type: "array"
        items:
          $ref: "#/definitions/SortWsDTO"
  ReturnStatusListWsDTO:
    type: "object"
    properties:
      statuses:
        type: "array"
        items:
          type: "string"
  ReviewWsDTO:
    type: "object"
    properties:
      alias:
        type: "string"
      comment:
        type: "string"
      date:
        type: "string"
        format: "date-time"
      headline:
        type: "string"
      id:
        type: "string"
      principal:
        $ref: "#/definitions/UserWsDTO"
      rating:
        type: "number"
        format: "double"
  SortWsDTO:
    type: "object"
    properties:
      code:
        type: "string"
      name:
        type: "string"
      selected:
        type: "boolean"
  SpecialOpeningDayWsDTO:
    type: "object"
    properties:
      closed:
        type: "boolean"
      closingTime:
        $ref: "#/definitions/TimeWsDTO"
      comment:
        type: "string"
      date:
        type: "string"
        format: "date-time"
      formattedDate:
        type: "string"
      name:
        type: "string"
      openingTime:
        $ref: "#/definitions/TimeWsDTO"
  StockWsDTO:
    type: "object"
    properties:
      stockLevel:
        type: "integer"
        format: "int64"
      stockLevelStatus:
        type: "string"
  TimeWsDTO:
    type: "object"
    properties:
      formattedHour:
        type: "string"
      hour:
        type: "string"
        format: "byte"
      minute:
        type: "string"
        format: "byte"
  UserWsDTO:
    type: "object"
    properties:
      currency:
        $ref: "#/definitions/CurrencyWsDTO"
      customerId:
        type: "string"
      deactivationDate:
        type: "string"
        format: "date-time"
      defaultAddress:
        $ref: "#/definitions/AddressWsDTO"
      displayUid:
        type: "string"
      firstName:
        type: "string"
      language:
        $ref: "#/definitions/LanguageWsDTO"
      lastName:
        type: "string"
      name:
        type: "string"
      title:
        type: "string"
      titleCode:
        type: "string"
      uid:
        type: "string"
  VariantCategoryWsDTO:
    type: "object"
    properties:
      hasImage:
        type: "boolean"
      name:
        type: "string"
      priority:
        type: "integer"
        format: "int32"
  VariantMatrixElementWsDTO:
    type: "object"
    properties:
      isLeaf:
        type: "boolean"
      parentVariantCategory:
        $ref: "#/definitions/VariantCategoryWsDTO"
      variantOption:
        $ref: "#/definitions/VariantOptionWsDTO"
      variantValueCategory:
        $ref: "#/definitions/VariantValueCategoryWsDTO"
  VariantOptionQualifierWsDTO:
    type: "object"
    properties:
      image:
        $ref: "#/definitions/ImageWsDTO"
      name:
        type: "string"
      qualifier:
        type: "string"
      value:
        type: "string"
  VariantOptionWsDTO:
    type: "object"
    properties:
      code:
        type: "string"
      priceData:
        $ref: "#/definitions/PriceWsDTO"
      stock:
        $ref: "#/definitions/StockWsDTO"
      url:
        type: "string"
      variantOptionQualifiers:
        type: "array"
        items:
          $ref: "#/definitions/VariantOptionQualifierWsDTO"
  VariantValueCategoryWsDTO:
    type: "object"
    properties:
      name:
        type: "string"
      sequence:
        type: "integer"
        format: "int32"
      superCategories:
        type: "array"
        items:
          $ref: "#/definitions/VariantCategoryWsDTO"
  VoucherWsDTO:
    type: "object"
    properties:
      appliedValue:
        $ref: "#/definitions/PriceWsDTO"
      code:
        type: "string"
      currency:
        $ref: "#/definitions/CurrencyWsDTO"
      description:
        type: "string"
      freeShipping:
        type: "boolean"
      name:
        type: "string"
      value:
        type: "number"
        format: "double"
      valueFormatted:
        type: "string"
      valueString:
        type: "string"
      voucherCode:
        type: "string"
  WeekdayOpeningDayWsDTO:
    type: "object"
    properties:
      closed:
        type: "boolean"
      closingTime:
        $ref: "#/definitions/TimeWsDTO"
      openingTime:
        $ref: "#/definitions/TimeWsDTO"
      weekDay:
        type: "string"
`;
