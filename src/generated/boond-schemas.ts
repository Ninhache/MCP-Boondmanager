/* eslint-disable */
/**
 * Auto-generated from BoondManager JSON schemas.
 * Generated on: 2026-04-09
 * Source: https://doc.boondmanager.com/api-externe/
 * DO NOT MODIFY — run `npm run generate-types` to regenerate.
 */

// ─── resources ───
/**
 * List of resources
 */
export interface SchemasResourcesSearchJson {
  meta: {
    /**
     * Boond's version
     */
    version: string;
    /**
     * true if user is logged
     */
    isLogged: boolean;
    /**
     * User's language
     */
    language: "fr" | "en" | "es";
  } & {
    totals?: {
      /**
       * Number total of entities returned
       */
      rows?: number;
    };
    /**
     * True if search is performed on SolR database
     */
    solr?: boolean;
    /**
     * true if conditional fields are configured for this module
     */
    conditionalFields?: boolean;
  };
  data: {
    id: string;
    type: "resource";
    attributes: {
      creationDate?: string;
      civility?: number;
      thumbnail?: string;
      firstName?: string;
      lastName?: string;
      reference?: string;
      typeOf?: number;
      state?: number;
      isVisible?: boolean;
      skills?: string;
      /**
       * List of mobilities {id}
       */
      mobilityAreas?: string[];
      title?: string;
      availability?: string;
      realAvailability?: string;
      averageDailyPriceExcludingTax?: number;
      email1?: string;
      email2?: string;
      email3?: string;
      phone1?: string;
      phone2?: string;
      currency?: number;
      exchangeRate?: number;
      currencyAgency?: number;
      exchangeRateAgency?: number;
      numberOfResumes?: number;
      numberOfActivePositionings?: number;
      updateDate?: string;
      tools?: {
        /**
         * Tool {id}
         */
        tool: string;
        /**
         * Tool level
         */
        level: number;
      }[];
      expertiseAreas?: string[];
      activityAreas?: string[];
      diplomas?: string[];
      experience?: number;
      references?: {
        id: string;
        title: string;
        description: string;
      }[];
      languages?: {
        language: string;
        /**
         * Language level {id}
         */
        level: string;
      }[];
      /**
       * Does current user can access to technical datas ?
       */
      canShowTechnicalData?: boolean;
      /**
       * Does current user can access to actions datas ?
       */
      canShowActions?: boolean;
      /**
       * @minItems 0
       * @maxItems 4
       */
      socialNetworks?:
        | []
        | [
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
          ]
        | [
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
          ]
        | [
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
          ]
        | [
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
          ];
      creationSource?: string | null;
    };
    relationships?: {
      mainManager?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "resource";
            };
          };
      hrManager?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "resource";
            };
          };
      /**
       * Resource's agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
        };
      };
      pole?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "pole";
            };
          };
      /**
       * Resource's previous action
       */
      previousAction?: {
        data: {
          id: string;
          type: "action";
          text?: string;
        };
      };
      /**
       * Resource's next action
       */
      nextAction?: {
        data: {
          id: string;
          type: "action";
        };
      };
      lastAction?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "action";
            };
          };
    };
  }[];
  included?: (
    | {
        id: string;
        type: "resource";
        attributes?: {
          firstName?: string;
          lastName?: string;
        };
      }
    | {
        id: string;
        type: "agency";
        attributes?: {
          name?: string;
        };
      }
    | {
        id: string;
        type: "pole";
        attributes?: {
          name?: string;
        };
      }
    | {
        id: string;
        type: "action";
        attributes?: {
          startDate?: string;
          typeOf?: number;
          text?: string;
        };
      }
    | {
        id: string;
        type: "action";
        attributes?: {
          startDate?: string;
          typeOf?: number;
        };
      }
  )[];
}

// ─── candidates ───
/**
 * List of candidates
 */
export interface SchemasCandidatesSearchJson {
  meta: {
    /**
     * Boond's version
     */
    version: string;
    /**
     * true if user is logged
     */
    isLogged: boolean;
    /**
     * User's language
     */
    language: "fr" | "en" | "es";
  } & {
    totals?: {
      /**
       * Number total of entities returned
       */
      rows?: number;
    };
    /**
     * True if search is performed on SolR database
     */
    solr?: boolean;
    /**
     * true if ai parsing is enabled
     */
    isParsingEnabled?: boolean;
    /**
     * true if conditional fields are configured for this module
     */
    conditionalFields?: boolean;
  };
  data: {
    id: string;
    type: "candidate";
    attributes?: {
      creationDate?: string;
      updateDate?: string;
      civility?: number;
      thumbnail?: string;
      firstName?: string;
      lastName?: string;
      typeOf?: number;
      state?: number;
      isVisible?: boolean;
      skills?: string;
      /**
       * List of mobilities {id}
       */
      mobilityAreas?: string[];
      title?: string;
      availability?: number | string;
      email1?: string;
      email2?: string;
      email3?: string;
      phone1?: string;
      phone2?: string;
      town?: string;
      country?: string;
      source?: {
        typeOf: number;
        detail: string;
      };
      numberOfResumes?: number;
      numberOfActivePositionings?: number;
      /**
       * @minItems 0
       * @maxItems 4
       */
      socialNetworks?:
        | []
        | [
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
          ]
        | [
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
          ]
        | [
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
          ]
        | [
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
          ];
      diplomas?: string[];
      activityAreas?: string[];
      globalEvaluation?: string;
      languages?: {
        language: string;
        /**
         * Language level {id}
         */
        level: string;
      }[];
      expertiseAreas?: string[];
      experience?: number;
      /**
       * List of references
       */
      references?: {
        id: string;
        title: string;
        company?: string;
        location?: string;
        startMonth?: string;
        startYear?: string;
        endMonth?: string;
        endYear?: string;
        skills?: string;
        description: string;
        startDate?: string;
        endDate?: string;
        row?: number;
      }[];
      evaluations?: {
        id: string;
        notations: {
          criteria: number;
          evaluation: string;
        }[];
        date?: string;
        comments?: string;
        manager: {
          id: string;
          firstName: string;
          lastName: string;
        };
      }[];
      tools?: {
        /**
         * Tool {id}
         */
        tool: string;
        /**
         * Tool level
         */
        level: number;
      }[];
      /**
       * Does current user can access to technical datas ?
       */
      canShowTechnicalData?: boolean;
      /**
       * Does current user can access to actions datas ?
       */
      canShowActions?: boolean;
      creationSource?: string | null;
    };
    relationships?: {
      /**
       * Candidate's main manager
       */
      mainManager?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      hrManager?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "resource";
            };
          };
      /**
       * Candidate's agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
        };
      };
      pole?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "pole";
            };
          };
      /**
       * Candidate's previous action
       */
      previousAction?: {
        data: {
          id: string;
          type: "action";
        };
      };
      /**
       * Candidate's next action
       */
      nextAction?: {
        data: {
          id: string;
          type: "action";
        };
      };
      lastAction?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "action";
            };
          };
    };
  }[];
  included?: (
    | {
        id: string;
        type: "resource";
        attributes?: {
          firstName?: string;
          lastName?: string;
        };
      }
    | {
        id: string;
        type: "agency";
        attributes?: {
          name?: string;
        };
      }
    | {
        id: string;
        type: "pole";
        attributes?: {
          name?: string;
        };
      }
    | {
        id: string;
        type: "action";
        attributes?: {
          startDate?: string;
          typeOf?: number;
          text?: string;
        };
      }
    | {
        id: string;
        type: "action";
        attributes?: {
          startDate?: string;
          typeOf?: number;
        };
        relationships?: {
          /**
           * Candidate's main manager
           */
          mainManager?: {
            data: {
              id: string;
              type: "resource";
            };
          };
        };
      }
  )[];
}

// ─── projects ───
/**
 * List of projects
 */
export interface SchemasProjectsSearchJson {
  meta: {
    /**
     * Boond's version
     */
    version: string;
    /**
     * true if user is logged
     */
    isLogged: boolean;
    /**
     * User's language
     */
    language: "fr" | "en" | "es";
  } & {
    totals?: {
      /**
       * Number total of entities returned
       */
      rows?: number;
      /**
       * turnoverForecastExcludingTax + turnoverSignedExcludingTax
       */
      turnoverSimulatedExcludingTax?: number;
      /**
       * turnoverSimulatedExcludingTax - costsSimulatedExcludingTax
       */
      marginSimulatedExcludingTax?: number;
      /**
       * 100 * marginSimulatedExcludingTax / turnoverSimulatedExcludingTax
       */
      profitabilitySimulated?: number;
    };
  };
  data: {
    id: string;
    type: "project";
    attributes?: {
      startDate?: string;
      endDate?: string;
      typeOf?: number;
      mode?: number;
      reference?: string;
      currency?: number;
      exchangeRate?: number;
      currencyAgency?: number;
      exchangeRateAgency?: number;
      /**
       * turnoverForecastExcludingTax + turnoverSignedExcludingTax
       */
      turnoverSimulatedExcludingTax?: number;
      /**
       * turnoverSimulatedExcludingTax - costsSimulatedExcludingTax
       */
      marginSimulatedExcludingTax?: number;
      /**
       * 100 * marginSimulatedExcludingTax / turnoverSimulatedExcludingTax
       */
      profitabilitySimulated?: number;
      /**
       * If false then project is not accessible
       */
      canReadProject?: boolean;
      /**
       * If false then contact's data are masked
       */
      canShowContact?: boolean;
      /**
       * If false then company's data are masked
       */
      canShowCompany?: boolean;
      /**
       * If false then intermediaryContact is masked
       */
      canShowIntermediaryContact?: boolean;
      /**
       * If false then intermediaryCompany is masked
       */
      canShowIntermediaryCompany?: boolean;
      /**
       * If false then currency is masked
       */
      canShowCurrency?: boolean;
      /**
       * If false then currencyAgency is masked
       */
      canShowCurrencyAgency?: boolean;
      /**
       * If false then exchangeRate is masked
       */
      canShowExchangeRate?: boolean;
      /**
       * If false then exchangeRateAgency is masked
       */
      canShowExchangeRateAgency?: boolean;
      /**
       * If false then profitabilitySimulated is masked
       */
      canShowProfitabilitySimulated?: boolean;
      /**
       * If false then turnoverSimulatedExcludingTax is masked
       */
      canShowTurnoverSimulatedExcludingTax?: boolean;
      /**
       * If false then marginSimulatedExcludingTax is masked
       */
      canShowMarginSimulatedExcludingTax?: boolean;
      creationDate?: string;
      updateDate?: string;
    };
    relationships?: {
      /**
       * Project's main manager
       */
      mainManager?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      opportunity?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "opportunity";
            };
          };
      contact?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "contact";
            };
          };
      company?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "company";
            };
          };
      /**
       * Project's agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
        };
      };
      pole?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "pole";
            };
          };
      intermediaryCompany?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "company";
            };
          };
      intermediaryContact?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "contact";
            };
          };
    };
  }[];
  included?: (
    | {
        id: string;
        type: "resource";
        attributes?: {
          firstName?: string;
          lastName?: string;
        };
      }
    | {
        id: string;
        type: "opportunity";
        attributes?: {
          title?: string;
        };
      }
    | {
        id: string;
        type: "contact";
        attributes?: {
          firstName?: string;
          lastName?: string;
          /**
           * If false then contact is not accessible
           */
          canReadContact?: boolean;
        };
      }
    | {
        id: string;
        type: "company";
        attributes?: {
          name?: string;
          thumbnail?: string;
          /**
           * If false then company is not accessible
           */
          canReadCompany?: boolean;
        };
      }
    | {
        id: string;
        type: "agency";
        attributes?: {
          name?: string;
        };
      }
    | {
        id: string;
        type: "pole";
        attributes?: {
          name?: string;
        };
      }
  )[];
}

// ─── companies ───
/**
 * List of companies
 */
export interface SchemasCompaniesSearchJson {
  meta: {
    /**
     * Boond's version
     */
    version: string;
    /**
     * true if user is logged
     */
    isLogged: boolean;
    /**
     * User's language
     */
    language: "fr" | "en" | "es";
  } & {
    totals?: {
      /**
       * Number total of entities returned
       */
      rows?: number;
    };
    /**
     * True if search is performed on SolR database
     */
    solr?: boolean;
    /**
     * true if conditional fields are configured for this module
     */
    conditionalFields?: boolean;
  };
  data: {
    id: string;
    type: "company";
    attributes?: {
      name?: string;
      expertiseArea?: string;
      state?: number;
      informationComments?: string;
      thumbnail?: string;
      website?: string;
      phone1?: string;
      town?: string;
      country?: string;
      creationDate?: string;
      numberbOfActiveOpportunity?: number;
      updateDate?: string;
      /**
       * @minItems 0
       * @maxItems 4
       */
      socialNetworks?:
        | []
        | [
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
          ]
        | [
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
          ]
        | [
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
          ]
        | [
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
          ];
      creationSource?: string | null;
    };
    relationships?: {
      /**
       * Company's main manager
       */
      mainManager?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Company's agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
        };
      };
      pole?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "pole";
            };
          };
      /**
       * Company's previous action
       */
      previousAction?: {
        data: {
          id: string;
          type: "action";
        };
      };
      /**
       * Company's next action
       */
      nextAction?: {
        data: {
          id: string;
          type: "action";
        };
      };
    };
  }[];
  included?: (
    | {
        id: string;
        type: "resource";
        attributes?: {
          firstName?: string;
          lastName?: string;
        };
      }
    | {
        id: string;
        type: "agency";
        attributes?: {
          name?: string;
        };
      }
    | {
        id: string;
        type: "pole";
        attributes?: {
          name?: string;
        };
      }
    | {
        id: string;
        type: "action";
        attributes?: {
          startDate?: string;
          typeOf?: number;
          text?: string;
        };
      }
  )[];
}

// ─── opportunities ───
/**
 * List of opportunities
 */
export interface SchemasOpportunitiesSearchJson {
  meta: {
    /**
     * Boond's version
     */
    version: string;
    /**
     * true if user is logged
     */
    isLogged: boolean;
    /**
     * User's language
     */
    language: "fr" | "en" | "es";
  } & {
    totals?: {
      /**
       * Number total of entities returned
       */
      rows?: number;
      /**
       * turnoverEstimatedExcludingTax * weighting / 100
       */
      turnoverWeightedExcludingTax?: number;
      turnoverEstimatedExcludingTax?: number;
    };
  };
  data: {
    id: string;
    type: "opportunity";
    attributes?: {
      creationDate?: string;
      title?: string;
      reference?: string;
      typeOf?: number;
      mode?: 1 | 2 | 3 | 4;
      state?: number;
      place?: string;
      isVisible?: boolean;
      startDate?: string | "immediate";
      endDate?: string;
      closingDate?: string;
      answerDate?: string;
      duration?: number;
      currency?: number;
      exchangeRate?: number;
      currencyAgency?: number;
      exchangeRateAgency?: number;
      /**
       * turnoverEstimatedExcludingTax * weighting / 100
       */
      turnoverWeightedExcludingTax?: number;
      estimatesExcludingTax?: number;
      turnoverEstimatedExcludingTax?: number;
      /**
       * Expertise area {id}
       */
      expertiseArea?: string;
      activityAreas?: string[];
      origin?: {
        typeOf: number;
        detail: string;
      };
      tools?: string[];
      numberOfActivePositionings?: number;
      /**
       * If false then contact's data are masked
       */
      canShowContact?: boolean;
      /**
       * If false then company's data are masked
       */
      canShowCompany?: boolean;
      stateReason?: {
        typeOf?: number;
        detail?: string;
      };
      updateDate?: string;
      creationSource?: string | null;
    };
    relationships?: {
      /**
       * Opportunity's main manager
       */
      mainManager?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      hrManager?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "resource";
            };
          };
      /**
       * Opportunity's agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
        };
      };
      pole?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "pole";
            };
          };
      contact?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "contact";
            };
          };
      company?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "company";
            };
          };
    };
  }[];
  included?: (
    | {
        id: string;
        type: "resource";
        attributes?: {
          firstName?: string;
          lastName?: string;
        };
      }
    | {
        id: string;
        type: "agency";
        attributes?: {
          name?: string;
        };
      }
    | {
        id: string;
        type: "pole";
        attributes?: {
          name?: string;
        };
      }
    | {
        id: string;
        type: "contact";
        attributes?: {
          firstName?: string;
          lastName?: string;
          thumbnail?: string;
          /**
           * If false then contact is not accessible
           */
          canReadContact?: boolean;
        };
      }
    | {
        id: string;
        type: "company";
        attributes?: {
          name?: string;
          thumbnail?: string;
          /**
           * If false then company is not accessible
           */
          canReadCompany?: boolean;
        };
      }
  )[];
}

// ─── absences ───
/**
 * List of absences
 */
export interface SchemasAbsencesSearchJson {
  meta: {
    /**
     * Boond's version
     */
    version: string;
    /**
     * true if user is logged
     */
    isLogged: boolean;
    /**
     * User's language
     */
    language: "fr" | "en" | "es";
  } & {
    totals?: {
      /**
       * Number total of entities returned
       */
      rows?: number;
    };
  };
  data: {
    id: string;
    type: "absence";
    attributes?: {
      startDate?: string;
      /**
       * The value have to be superior or equal to startDate
       */
      endDate?: string;
      duration?: number;
      title?: string;
      workUnitType?: {
        reference: number;
        activityType:
          | "production"
          | "absence"
          | "internal"
          | "exceptionalTime"
          | "exceptionalCalendar";
        name: string;
      };
      absencesReport?: {
        id?: string;
        creationDate?: string;
        state?: "savedAndNoValidation" | "waitingForValidation" | "validated" | "rejected";
        /**
         * Agency on which absences account depends
         */
        agency?: {
          id?: string;
          name?: string;
          workUnitRate?: "notUsed" | number;
        };
        /**
         * Resource on which absences account depends
         */
        resource?: {
          id?: string;
          lastName?: string;
          firstName?: string;
          workUnitRate?: "notUsed" | number;
        };
      };
    };
  }[];
}

// ─── actions ───
/**
 * List of actions
 */
export interface SchemasActionsSearchJson {
  meta: {
    /**
     * Boond's version
     */
    version: string;
    /**
     * true if user is logged
     */
    isLogged: boolean;
    /**
     * User's language
     */
    language: "fr" | "en" | "es";
  } & {
    totals?: {
      /**
       * Number total of entities returned
       */
      rows?: number;
    };
  };
  data: {
    id: string;
    type: "action";
    attributes?: {
      startDate?: string;
      creationDate?: string;
      typeOf?: number;
      text?: string;
      numberOfFiles?: number;
      /**
       * If false then action is not accessible
       */
      canReadAction?: boolean;
      /**
       * If false then action is not editable
       */
      canWriteAction?: boolean;
      updateDate?: string;
    };
    relationships?: {
      /**
       * Action's main manager
       */
      mainManager?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      company?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "company";
            };
          };
      file?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "document";
            };
          };
      dependsOn?:
        | {
            data: {
              id: string;
              type: "resource";
            };
          }
        | {
            data: {
              id: string;
              type: "candidate";
            };
          }
        | {
            data: {
              id: string;
              type: "opportunity";
            };
          }
        | {
            data: {
              id: string;
              type: "project";
            };
          }
        | {
            data: {
              id: string;
              type: "order";
            };
          }
        | {
            data: {
              id: string;
              type: "invoice";
            };
          }
        | {
            data: {
              id: string;
              type: "contact";
            };
          };
      /**
       * List of action's which are related between them
       */
      relatedActions?: {
        data: {
          id: string;
          type: "action";
        }[];
      };
    };
  }[];
  included?: (
    | {
        id: string;
        type: "resource";
        attributes?: {
          firstName?: string;
          lastName?: string;
          email1?: string;
          phone1?: string;
          phone2?: string;
          thumbnail?: string;
        };
      }
    | {
        id: string;
        type: "candidate";
        attributes?: {
          firstName?: string;
          lastName?: string;
          email1?: string;
          phone1?: string;
          phone2?: string;
          thumbnail?: string;
        };
      }
    | {
        id: string;
        type: "contact";
        attributes?: {
          firstName?: string;
          lastName?: string;
          email1?: string;
          phone1?: string;
          phone2?: string;
          thumbnail?: string;
        };
        relationships?: {
          /**
           * Contact's company
           */
          company?: {
            data: {
              id: string;
              type: "company";
            };
          };
        };
      }
    | {
        id: string;
        type: "project";
        attributes?: {
          reference?: string;
        };
        relationships?: {
          contact?:
            | {
                data: null;
              }
            | {
                data: {
                  id: string;
                  type: "contact";
                };
              };
          company?:
            | {
                data: null;
              }
            | {
                data: {
                  id: string;
                  type: "company";
                };
              };
        };
      }
    | {
        id: string;
        type: "opportunity";
        attributes?: {
          reference?: string;
          title?: string;
        };
        relationships?: {
          contact?:
            | {
                data: null;
              }
            | {
                data: {
                  id: string;
                  type: "contact";
                };
              };
          company?:
            | {
                data: null;
              }
            | {
                data: {
                  id: string;
                  type: "company";
                };
              };
        };
      }
    | {
        id: string;
        type: "company";
        attributes?: {
          name?: string;
          phone1?: string;
          thumbnail?: string;
        };
      }
    | {
        id: string;
        type: "order";
        attributes?: {
          reference?: string;
          number?: string;
        };
        relationships?: {
          /**
           * Order's project
           */
          project?: {
            data: {
              id: string;
              type: "project";
            };
          };
        };
      }
    | {
        id: string;
        type: "invoice";
        attributes?: {
          reference?: string;
        };
        relationships?: {
          /**
           * Invoice's order
           */
          order?: {
            data: {
              id: string;
              type: "order";
            };
          };
        };
      }
    | {
        id: string;
        type: "document";
        attributes?: {
          name?: string;
        };
      }
    | {
        id: string;
        type: "action";
        attributes?: {
          typeOf?: number;
          /**
           * If false then action is not accessible
           */
          canReadAction?: boolean;
          relationType?: "parent" | "child";
        };
        relationships?: {
          company?:
            | {
                data: null;
              }
            | {
                data: {
                  id: string;
                  type: "company";
                };
              };
          dependsOn?:
            | {
                data: {
                  id: string;
                  type: "resource";
                };
              }
            | {
                data: {
                  id: string;
                  type: "candidate";
                };
              }
            | {
                data: {
                  id: string;
                  type: "opportunity";
                };
              }
            | {
                data: {
                  id: string;
                  type: "project";
                };
              }
            | {
                data: {
                  id: string;
                  type: "order";
                };
              }
            | {
                data: {
                  id: string;
                  type: "invoice";
                };
              }
            | {
                data: {
                  id: string;
                  type: "contact";
                };
              };
        };
      }
  )[];
}
