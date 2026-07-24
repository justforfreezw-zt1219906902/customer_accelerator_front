# Backend API Overview

## Purpose

The documented API accepts a lead from the mi-goTo Contact Page and coordinates
backend processing.

## Confirmed workflow

For `POST /api/lead`, the Go backend will:

1. create or update the contact in HubSpot;
2. ensure the company exists;
3. associate the contact with the company;
4. send an internal notification email; and
5. return the HubSpot contact ID.

## Known environments

| Environment | Base URL | Status |
| --- | --- | --- |
| Local | `http://localhost:8080` | Supplied; runtime availability not validated |
| Production | Not supplied | Unresolved |

The OpenAPI production server uses the reserved `.invalid` domain solely to
represent the unresolved URL. It is not a deployment target.

## Contract record

- Contract location: `docs/05-backend/openapi.yaml`
- Contract revision: `1`
- Official Backend API semantic version: unassigned
- Compatibility placeholder: `0.0.0`
- Known endpoint: `POST /api/lead`
- Content type: `application/json`
- Authentication requirement: not specified

## Ownership

The backend owner controls the contract, behavior, and official API version.
The specific human backend owner has not been supplied. Product and Interaction
Specifications independently control frontend behavior around the contract.

## Version warning

Contract revision `1` is not Backend API version `1.0.0`. The placeholder
`0.0.0` must remain until a human backend owner assigns an official semantic
version.

