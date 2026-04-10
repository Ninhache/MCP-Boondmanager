# Tools reference

Complete reference for all **45 MCP tools** exposed by the server, grouped by module.

Every list tool supports these standard parameters:
- `page` (number, optional) — page number, default 1
- `pageSize` (number, optional) — items per page, default 25
- `fetchAll` (boolean, optional) — fetch all pages up to `BOOND_MAX_RESULTS` (default 500)
- `keywords` (string, optional) — keyword filter (most modules)

## Core business modules

### Resources (collaborators)
| Tool | Method | Description |
|------|--------|-------------|
| `list_resources` | GET /resources | Liste les collaborateurs |
| `get_resource` | GET /resources/{id}[/{tab}] | Détail — `tab` ∈ `{information, projects, absences, timesReport, expensesReport}` |

### Candidates
| Tool | Method | Description |
|------|--------|-------------|
| `search_candidates` | GET /candidates | Recherche candidats (keywords requis) |
| `get_candidate` | GET /candidates/{id} | Détail candidat |

### Projects
| Tool | Method | Description |
|------|--------|-------------|
| `list_projects` | GET /projects | Liste projets / missions |
| `get_project` | GET /projects/{id} | Détail projet |

### Companies
| Tool | Method | Description |
|------|--------|-------------|
| `list_companies` | GET /companies | Liste entreprises (clients, prospects) |
| `get_company` | GET /companies/{id} | Détail entreprise |

### Opportunities
| Tool | Method | Description |
|------|--------|-------------|
| `list_opportunities` | GET /opportunities | Opportunités commerciales |
| `get_opportunity` | GET /opportunities/{id} | Détail opportunité |

### Absences
| Tool | Method | Description |
|------|--------|-------------|
| `list_absences` | GET /absences | Congés / absences |

### Actions (commercial actions)
| Tool | Method | Description |
|------|--------|-------------|
| `list_actions` | GET /actions | Liste actions commerciales |
| `get_action` | GET /actions/{id} | Détail action |
| `create_action` | POST /actions | **Write** — crée une action |
| `update_action` | PATCH /actions/{id} | **Write** — modifie une action |
| `delete_action` | DELETE /actions/{id} | **⚠️ Destructive** — supprime une action |

## Commercial / financial modules

### Positionings
| Tool | Method | Description |
|------|--------|-------------|
| `list_positionings` | GET /positionings | Positionnements (affectations candidats ↔ missions) |
| `get_positioning` | GET /positionings/{id} | Détail |

### Purchases
| Tool | Method | Description |
|------|--------|-------------|
| `list_purchases` | GET /purchases | Achats |
| `get_purchase` | GET /purchases/{id} | Détail |

### Invoices
| Tool | Method | Description |
|------|--------|-------------|
| `list_invoices` | GET /invoices | Factures |
| `get_invoice` | GET /invoices/{id} | Détail |

### Orders
| Tool | Method | Description |
|------|--------|-------------|
| `list_orders` | GET /orders | Commandes |
| `get_order` | GET /orders/{id} | Détail |

### Expenses
| Tool | Method | Description |
|------|--------|-------------|
| `list_expenses` | GET /expenses | Notes de frais |
| `get_expense` | GET /expenses/{id} | Détail |

### Products
| Tool | Method | Description |
|------|--------|-------------|
| `list_products` | GET /products | Produits |
| `get_product` | GET /products/{id} | Détail |

### Payments
| Tool | Method | Description |
|------|--------|-------------|
| `list_payments` | GET /payments | Paiements |
| `get_payment` | GET /payments/{id} | Détail |

### Times
| Tool | Method | Description |
|------|--------|-------------|
| `list_times` | GET /times | Suivi des temps / CRA |
| `get_time` | GET /times/{id} | Détail |

## Organizational modules

### Agencies
| Tool | Method | Description |
|------|--------|-------------|
| `list_agencies` | GET /agencies | Agences |
| `get_agency` | GET /agencies/{id} | Détail |

### Poles
| Tool | Method | Description |
|------|--------|-------------|
| `list_poles` | GET /poles | Pôles internes |
| `get_pole` | GET /poles/{id} | Détail |

### Calendars
| Tool | Method | Description |
|------|--------|-------------|
| `list_calendars` | GET /calendars | Calendriers (list only) |

### Dashboards
| Tool | Method | Description |
|------|--------|-------------|
| `list_dashboards` | GET /dashboards | Tableaux de bord (list only) |

## Admin modules

### Notifications
| Tool | Method | Description |
|------|--------|-------------|
| `list_notifications` | GET /notifications | Notifications système |

### Validations
| Tool | Method | Description |
|------|--------|-------------|
| `list_validations` | GET /validations | Workflow de validation / approbation |

### Roles
| Tool | Method | Description |
|------|--------|-------------|
| `list_roles` | GET /roles | Rôles utilisateurs |

### Accounts
| Tool | Method | Description |
|------|--------|-------------|
| `list_accounts` | GET /accounts | Comptes utilisateurs (managers) |
| `get_account` | GET /accounts/{id} | Détail |

### Contacts
| Tool | Method | Description |
|------|--------|-------------|
| `list_contacts` | GET /contacts | Contacts chez les clients |
| `get_contact` | GET /contacts/{id} | Détail |

## MCP Prompts

Reusable conversation templates (not tools — invoked by the host, not the LLM):

| Prompt | Description |
|--------|-------------|
| `activity_report` | Rapport d'activité mensuel d'un collaborateur |
| `find_available_consultants` | Recherche de consultants disponibles par compétences |
| `project_status_summary` | Résumé du statut d'un projet |

All prompts accept an optional `locale: "fr" | "en"` parameter.

## MCP Resources

Read-only data snapshots (URI-addressable):

| URI | Description |
|-----|-------------|
| `boond://config` | Version Boond, langue, login status |
| `boond://stats` | Total counts pour resources, projects, candidates, companies, opportunities |

## Response shape

All tools return structured MCP responses:

**Success (list)**:
```json
{
  "content": [{
    "type": "text",
    "text": "{\"total\":17,\"page_count\":1,\"items\":[...]}"
  }]
}
```

**Success (fetchAll)**:
```json
{
  "content": [{
    "type": "text",
    "text": "{\"total\":1200,\"fetched\":500,\"truncated\":true,\"items\":[...]}"
  }]
}
```

**Error**:
```json
{
  "content": [{
    "type": "text",
    "text": "{\"error\":\"Identifiants Boond invalides ou expirés\",\"status\":401}"
  }],
  "isError": true
}
```

## Totals

- **42 read tools** (list + get)
- **3 write tools** (create/update/delete on Actions)
- **3 prompts**
- **2 resources**
- **24 Boond modules covered**
