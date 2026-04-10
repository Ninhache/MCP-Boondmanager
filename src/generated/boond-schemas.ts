/* eslint-disable */
/**
 * Auto-generated from BoondManager JSON schemas.
 * Generated on: 2026-04-10
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

// ─── positionings ───
/**
 * List of positionings
 */
export interface SchemasPositioningsSearchJson {
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
     * true if conditional fields are configured for this module
     */
    conditionalFields?: boolean;
  };
  data: {
    id: string;
    type: "positioning";
    attributes?: {
      creationDate?: string;
      updateDate?: string;
      state?: number;
      stateReason?: {
        typeOf?: number;
        detail?: string;
      };
      startDate?: string;
      endDate?: string;
      informationComments?: string;
      /**
       * If false then positioning is not accessible
       */
      canReadPositioning?: boolean;
      /**
       * If false then dependsOn's data are masked
       */
      canShowDependsOn?: boolean;
      /**
       * If false then opportunity's data are masked
       */
      canShowOpportunity?: boolean;
      /**
       * If false then updateDate is masked
       */
      canShowUpdateDate?: boolean;
      /**
       * If false then state is masked
       */
      canShowState?: boolean;
      /**
       * If false then creationDate is masked
       */
      canShowCreationDate?: boolean;
      /**
       * If false then startDate is masked
       */
      canShowStartDate?: boolean;
      /**
       * If false then endDate is masked
       */
      canShowEndDate?: boolean;
      /**
       * If false then informationComments is masked
       */
      canShowInformationComments?: boolean;
      creationSource?: string | null;
    };
    relationships?: {
      /**
       * Target's resource
       */
      createdBy?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Positioning's creator
       */
      creator?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Opportunity on which positioning depends
       */
      opportunity?: {
        data: {
          id: string;
          type: "opportunity";
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
              type: "product";
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
          thumbnail?: string;
          typeOf?: number;
          title?: string;
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
        };
      }
    | {
        id: string;
        type: "candidate";
        attributes?: {
          lastName?: string;
          firstName?: string;
          thumbnail?: string;
          typeOf?: number;
          title?: string;
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
        };
      }
    | {
        id: string;
        type: "opportunity";
        attributes?: {
          title?: string;
          reference?: string;
          typeOf?: number;
          mode?: 1 | 2 | 3 | 4;
          isVisible?: boolean;
          /**
           * If false then contact's data are masked
           */
          canShowContact?: boolean;
          /**
           * If false then company's data are masked
           */
          canShowCompany?: boolean;
          currency?: number;
          /**
           * If false then opportunity is not accessible
           */
          canReadOpportunity?: boolean;
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
        };
      }
    | {
        id: string;
        type: "product";
        attributes?: {
          reference?: string;
          subscription?: number;
          name?: string;
        };
        relationships?: {
          /**
           * Product's main manager
           */
          mainManager?: {
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
    | (
        | {
            data: null;
          }
        | {
            id: string;
            type: "pole";
            attributes?: {
              name?: string;
            };
          }
      )
  )[];
}

// ─── purchases ───
/**
 * List of purchases
 */
export interface SchemasPurchasesSearchJson {
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
       * Sum of all amountExcludingTax * quantity
       */
      totalAmountExcludingTax?: number;
      /**
       * engagedPaymentsAmountExcludingTax - totalAmountExcludingTax
       */
      deltaExcludingTax?: number;
      /**
       * Sum of engaged payments amount excluding tax (state's payments id is not 0)
       */
      engagedPaymentsAmountExcludingTax?: number;
    };
  };
  data: {
    id: string;
    type: "purchase";
    attributes?: {
      date?: string;
      title?: string;
      subscription?: number;
      typeOf?: number;
      reference?: string;
      state?: number;
      taxRate?: number;
      currency?: number;
      exchangeRate?: number;
      currencyAgency?: number;
      exchangeRateAgency?: number;
      amountExcludingTax?: number;
      quantity?: number;
      /**
       * Sum of all amountExcludingTax * quantity
       */
      totalAmountExcludingTax?: number;
      /**
       * engagedPaymentsAmountExcludingTax - totalAmountExcludingTax
       */
      deltaExcludingTax?: number;
      /**
       * Sum of engaged payments amount excluding tax (state's payments id is not 0)
       */
      engagedPaymentsAmountExcludingTax?: number;
      creationDate?: string;
      updateDate?: string;
    };
    relationships?: {
      /**
       * Purchase's main manager
       */
      mainManager?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      project?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "project";
            };
          };
      delivery?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "delivery";
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
       * Purchase's agency
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
        type: "project";
        attributes?: {
          reference?: string;
        };
      }
    | {
        id: string;
        type: "contact";
        attributes?: {
          firstName?: string;
          lastName?: string;
        };
      }
    | {
        id: string;
        type: "company";
        attributes?: {
          name?: string;
        };
      }
    | {
        id: string;
        type: "delivery";
        attributes?: {
          title?: string;
        };
        relationships?: {
          dependsOn?: {
            data: {
              id: string;
              type: "resource";
            };
          };
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

// ─── invoices ───
/**
 * List of invoices
 */
export interface SchemasInvoicesSearchJson {
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
       * Sum of invoiced amount excluding tax
       */
      turnoverInvoicedExcludingTax?: number;
      /**
       * Sum of invoiced amount including tax
       */
      turnoverInvoicedIncludingTax?: number;
      /**
       * Amount left to pay on invoice including tax
       */
      totalPayableIncludingTax?: number;
    };
  };
  data: {
    id: string;
    type: "invoice";
    attributes?: {
      date?: string;
      expectedPaymentDate?: string;
      /**
       * Sum of invoiced amount excluding tax
       */
      turnoverInvoicedExcludingTax?: number;
      /**
       * Sum of invoiced amount including tax
       */
      turnoverInvoicedIncludingTax?: number;
      isCreditNote?: boolean;
      reference?: string;
      state?: number;
      sendingState?: number;
      refuseReason?: string;
      taxReportState?: number;
      currency?: number;
      exchangeRate?: number;
      currencyAgency?: number;
      exchangeRateAgency?: number;
      paymentMethod?: number;
      closed?: boolean;
      /**
       * Amount left to pay on invoice including tax
       */
      totalPayableIncludingTax?: number;
      creationDate?: string;
      updateDate?: string;
      startDate?: string;
      /**
       * The value have to be superior or equal to startDate
       */
      endDate?: string;
      performedPaymentDate?: string;
      /**
       * If true then invoice can be sent with peppol network
       */
      canSendWithPeppol?: boolean;
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
      schedule?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "schedule";
            };
          };
    };
  }[];
  included?: (
    | {
        id: string;
        type: "order";
        attributes?: {
          number?: string;
          reference?: string;
        };
        relationships?: {
          /**
           * Order's main manager
           */
          mainManager?: {
            data: {
              id: string;
              type: "resource";
            };
          };
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
        type: "project";
        attributes?: {
          reference?: string;
          typeOf?: number;
          mode?: number;
        };
        relationships?: {
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
        };
      }
    | {
        id: string;
        type: "company";
        attributes?: {
          name?: string;
          thumbnail?: string;
        };
      }
    | {
        id: string;
        type: "schedule";
        attributes?: {
          date?: string;
          title?: string;
        };
      }
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
          invoicesLockingStates?: number[];
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

// ─── orders ───
/**
 * List of orders
 */
export interface SchemasOrdersSearchJson {
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
       * Sum of invoiced amount excluding tax
       */
      turnoverInvoicedExcludingTax?: number;
      /**
       * Sum of ordered amount excluding tax
       */
      turnoverOrderedExcludingTax?: number;
      /**
       * turnoverInvoicedExcludingTax - turnoverOrderedExcludingTax
       */
      deltaInvoicedExcludingTax?: number;
    };
  };
  data: {
    id: string;
    type: "order";
    attributes?: {
      date?: string;
      number?: string;
      reference?: string;
      customerAgreement?: boolean;
      billableItemTypes?: {
        [k: string]: unknown;
      }[];
      /**
       * Sum of invoiced amount excluding tax
       */
      turnoverInvoicedExcludingTax?: number;
      /**
       * Sum of ordered amount excluding tax
       */
      turnoverOrderedExcludingTax?: number;
      /**
       * turnoverInvoicedExcludingTax - turnoverOrderedExcludingTax
       */
      deltaInvoicedExcludingTax?: number;
      requestTimesheetsSignature?: boolean;
      state?: number;
      creationDate?: string;
      updateDate?: string;
    };
    relationships?: {
      /**
       * Order's main manager
       */
      mainManager?: {
        data: {
          id: string;
          type: "resource";
        };
      };
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
  }[];
  included?: (
    | {
        id: string;
        type: "project";
        attributes?: {
          reference?: string;
          typeOf?: number;
          mode?: number;
          currency?: number;
          exchangeRate?: number;
          currencyAgency?: number;
          exchangeRateAgency?: number;
        };
        relationships?: {
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
        };
      }
    | {
        id: string;
        type: "company";
        attributes?: {
          name?: string;
          thumbnail?: string;
        };
      }
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
  )[];
}

// ─── expenses ───
/**
 * List of expenses
 */
export interface SchemasExpensesSearchJson {
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
    type: "expense";
    attributes?: {
      category?: "actual" | "fixed";
      activityType?: "production" | "absence" | "internal";
      expenseType?: null | {
        reference: number;
        taxRate: number;
        name: string;
        guest?: boolean;
        mealDeduction?: boolean;
        position?: number;
      };
      /**
       * If it is a new line then row should be inferior or equal to 0
       */
      row?: number;
      startDate?: string;
      reinvoiced?: boolean;
      /**
       * If kilometer expenses then numberOfKilometers * ratePerKilometerType else cf. database
       */
      amountIncludingTax?: number;
      tax?: number;
      numberOfKilometers?: number;
      number?: number;
      title?: string;
      currency?: number;
      exchangeRate?: number;
      isKilometricExpense?: boolean;
      expensesReport?: {
        id: string;
        term: string;
        state: "savedAndNoValidation" | "waitingForValidation" | "validated" | "rejected";
        ratePerKilometerType: {
          reference: number;
          name: string;
          amount: number;
        };
        advance?: number;
        agency?: {
          id?: string;
          name?: string;
          workUnitRate?: "notUsed" | number;
        };
        resource?: {
          id?: string;
          lastName?: string;
          firstName?: string;
        };
      };
      delivery?: null | {
        id: string;
        title?: string;
        startDate?: string;
        endDate?: string;
      };
      batch?: null | {
        id: string;
        title?: string;
      };
      project?: null | {
        id: string;
        reference?: string;
      };
      guestResources?: {
        id?: string;
        lastName?: string;
        firstName?: string;
        thumbnail?: string;
      }[];
    };
  }[];
}

// ─── products ───
/**
 * List of products
 */
export interface SchemasProductsSearchJson {
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
    type: "product";
    attributes?: {
      reference?: string;
      subscription?: number;
      name?: string;
      priceExcludingTax?: number;
      currency?: number;
      exchangeRate?: number;
      currencyAgency?: number;
      exchangeRateAgency?: number;
    };
    relationships?: {
      /**
       * Product's main manager
       */
      mainManager?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Product's agency
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
  )[];
}

// ─── agencies ───
/**
 * List of agencies
 */
export interface SchemasAgenciesSearchJson {
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
    type: "agency";
    attributes?: {
      name?: string;
      calendar?: string;
      currency?: number;
      numberOfWorkingDays?: number;
      chargeFactor?: number;
      vatNumber?: string;
      registrationNumber?: string;
      address?: string;
      postcode?: string;
      town?: string;
      country?: string;
      staff?: number;
      state?: boolean;
      workUnitRate?: "notUsed" | number;
      workUnitRateOnProjectsAndOpportunities?: number;
      subDivision?: string;
    };
  }[];
}

// ─── poles ───
/**
 * List of poles
 */
export interface SchemasPolesSearchJson {
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
    type: "pole";
    attributes?: {
      name?: string;
      state?: boolean;
    };
  }[];
}

// ─── calendars ───
/**
 * List of calendars
 */
export interface SchemasCalendarsSearchJson {
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
  };
  data: {
    iso: string;
    value: string;
    subCalendars?: {
      iso: string;
      value: string;
    }[];
  }[];
}

// ─── dashboards ───
/**
 * List of dashboard for Current User
 */
export interface SchemasDashboardsSearchJson {
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
    type: "dashboard";
    attributes?: {
      /**
       * Title of dashboard
       */
      title?: string;
      /**
       * Description of dashboard
       */
      "description,"?: string;
      /**
       * Category of analytics dashboard
       */
      "category,"?: "sales" | "hr" | "delivery" | "finance" | "recruitment";
      /**
       * Number of columns to display the dashboard
       */
      columns?: number;
      /**
       * True if the dashboard is the default dashboard
       */
      isDefault?: boolean;
      /**
       * Type of dashboard
       */
      typeOf?: "dashboard" | "analytics";
      /**
       * Gadgets to display on the dashboard
       */
      gadgets?: {
        id: string;
        /**
         * Type of the gadget
         */
        gadgetType: "widget" | "metric" | "collection";
        /**
         * Type of the widget if gadgetType is widget
         */
        widgetType:
          | "resourceTimesReports"
          | "resourceExpensesReports"
          | "resourceAbsencesReports"
          | "summary"
          | "recruitmentsFunnel"
          | "salesFunnel"
          | "opportunitiesDistribution"
          | "opportunitiesDistributionByState"
          | "positioningsDistributionByState"
          | "candidatesDistribution"
          | "chargedTurnoverSignedTurnover"
          | "chargedTurnoverProductionTurnoverSignedTurnover"
          | "chargedTurnoverChargedMargin"
          | "productionTurnoverProductionMargin"
          | "signedTurnoverSignedMargin"
          | "signedPeriodTurnoverCharged"
          | "chargedPeriodTurnoverProductionTurnoverSignedTurnover"
          | "periodTurnoverChargedMarginPeriodCharged"
          | "digitalWorkplace"
          | "myPeriodicalsTargets"
          | "myFormsToComplete";
        /**
         * Additional type of widget if gadgetType is widget and widgetType is analytics
         */
        widgetTypeOf?: "chart" | "table" | "number";
        /**
         * Module associated to the gadget
         */
        module: string;
        /**
         * Title of the gadget
         */
        title: string;
        /**
         * Description of the gadget
         */
        description?: string;
        /**
         * Position of the gadget
         */
        col: number;
        /**
         * Position of the gadget
         */
        row: number;
        /**
         * JSON Object with parameters to display gadget's data
         */
        params: {
          [k: string]: unknown;
        };
        /**
         * Charts associated to the gadget (for Periodical Targets)
         */
        charts: unknown[];
        /**
         * User can read gadget
         */
        canReadGadget: boolean;
        /**
         * User can write gadget
         */
        canWriteGadget: boolean;
      }[];
    };
  }[];
}

// ─── notifications ───
/**
 * List of current user notifications
 */
export interface SchemasNotificationsSearchJson {
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
       * Total number of read notification
       */
      unread?: {
        oneOf?: {
          /**
           * Number of unread notification of type thread
           */
          thread?: number;
          /**
           * Number of unread notification of type activity
           */
          activity?: number;
        };
      };
    };
    /**
     * Timestamp of the last notification available for this user independently of filters.
     */
    last?: {
      [k: string]: unknown;
    };
  };
  data: {
    id: string;
    type: "notification";
    attributes?: {
      title?: string;
      message?: string;
      state?: "new" | "read";
      creationDate?: string;
      category?: "activity" | "thread";
      type?:
        | "unknown"
        | "autotimesheet"
        | "autoexpense"
        | "pending"
        | "validated"
        | "rejected"
        | "refused"
        | "deleted"
        | "created"
        | "shared"
        | "mention"
        | "daily"
        | "weekly"
        | "positioning"
        | "response"
        | "monthly"
        | "digitalworkplacecategorydocument"
        | "digitalworkplacenews"
        | "bankingerror"
        | "bankingreconciliation"
        | "bankingsuccess"
        | "bankingpending"
        | "bankingexpired";
      parentType?: (
        | "global"
        | "absencesreport"
        | "contract"
        | "delivery"
        | "positioning"
        | "contact"
        | "opportunity"
        | "company"
        | "project"
        | "order"
        | "invoice"
        | "purchase"
        | "payment"
        | "inactivity"
        | "groupment"
        | "advantage"
        | "action"
        | "timesreport"
        | "expensesreport"
        | "candidate"
        | "resource"
        | "product"
        | "quotation"
        | "app:wnotification"
        | "app:celebrations"
      )[];
    };
    relationships?: {
      /**
       * Notification recipient
       */
      createdFor: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Notification author
       */
      createdBy?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      dependsOn?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "action";
            };
          }
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
              type: "project";
            };
          }
        | {
            data: {
              id: string;
              type: "contact";
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
              type: "product";
            };
          }
        | {
            data: {
              id: string;
              type: "purchase";
            };
          }
        | {
            data: {
              id: string;
              type: "payment";
            };
          }
        | {
            data: {
              id: string;
              type: "delivery";
            };
          }
        | {
            data: {
              id: string;
              type: "positioning";
            };
          }
        | {
            data: {
              id: string;
              type: "timesreport";
            };
          }
        | {
            data: {
              id: string;
              type: "expensesreport";
            };
          }
        | {
            data: {
              id: string;
              type: "absencesreport";
            };
          }
        | {
            data: {
              id: string;
              type: "contract";
            };
          }
        | {
            data: {
              id: string;
              type: "advantage";
            };
          }
        | {
            data: {
              id: string;
              type: "groupment";
            };
          }
        | {
            data: {
              id: string;
              type: "inactivity";
            };
          }
        | {
            data: {
              id: string;
              type: "quotation";
            };
          };
    };
  }[];
}

// ─── validations ───
/**
 * List of validations
 */
export interface SchemasValidationsSearchJson {
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
  } & {
    creationDate?: string;
    status?: "waiting" | "running" | "finished" | "failed";
  };
  data: {
    id: string;
    type: "validation";
    attributes?: {
      date?: string;
      state?: "waitingForValidation" | "validated" | "rejected";
      nbAlerts?: number;
      expectedValidatorsAllowedForValidate?: {
        id: string;
      }[];
      expectedValidatorsAllowedForUnValidate?: {
        id: string;
      }[];
      expectedValidatorsAllowedForReject?: {
        id: string;
      }[];
    };
    relationships?: {
      expectedValidator?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      realValidator?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "resource";
            };
          };
      dependsOn?:
        | {
            data: {
              id: string;
              type: "timesreport";
            };
          }
        | {
            data: {
              id: string;
              type: "expensesreport";
            };
          }
        | {
            data: {
              id: string;
              type: "absencesreport";
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
          thumbnail?: string;
        };
      }
    | {
        id?: string;
        type?: "timesreport";
        attributes?: {
          term?: string;
          closed?: boolean;
          state?: "savedAndNoValidation" | "waitingForValidation" | "validated" | "rejected";
        };
        relationships?: {
          /**
           * Timesheet's resource
           */
          resource?: {
            data: {
              id: string;
              type: "resource";
            };
          };
          /**
           * Timesheet's agency
           */
          agency?: {
            data: {
              id: string;
              type: "agency";
            };
          };
        };
      }
    | {
        id?: string;
        type?: "expensesreport";
        attributes?: {
          term?: string;
          closed?: boolean;
          state?: "savedAndNoValidation" | "waitingForValidation" | "validated" | "rejected";
        };
        relationships?: {
          /**
           * Expenses resource
           */
          resource?: {
            data: {
              id: string;
              type: "resource";
            };
          };
          /**
           * Expenses's agency
           */
          agency?: {
            data: {
              id: string;
              type: "agency";
            };
          };
        };
      }
    | {
        id?: string;
        type?: "absencesreport";
        attributes?: {
          creationDate?: string;
          state?: "savedAndNoValidation" | "waitingForValidation" | "validated" | "rejected";
          /**
           * List of absences periods
           */
          absencesPeriods?: {
            id: string;
            startDate: string;
            /**
             * The value have to be superior or equal to startDate
             */
            endDate: string;
            duration: number;
            title?: string;
            workUnitType: {
              reference: number;
              activityType:
                | "production"
                | "absence"
                | "internal"
                | "exceptionalTime"
                | "exceptionalCalendar";
              name: string;
            };
          }[];
        };
        relationships?: {
          /**
           * Leaves request's resource
           */
          resource?: {
            data: {
              id: string;
              type: "resource";
            };
          };
          /**
           * Leaves request's agency
           */
          agency?: {
            data: {
              id: string;
              type: "agency";
            };
          };
        };
      }
  )[];
}

// ─── roles ───
/**
 * List of roles
 */
export interface SchemasRolesSearchJson {
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
    type: "role";
    attributes?: {
      name?: string;
      /**
       * Number of manager whose are attached to this role
       */
      numberOfAccounts?: number;
      /**
       * Number of active manager whose are attached to this role
       */
      numberOfActiveAccounts?: number;
      /**
       * true if secondary agencies is defined on this role and not on manager's account
       */
      isSecondaryAgenciesAllowed?: boolean;
      /**
       * true if secondary poles is defined on this role and not on manager's account
       */
      isSecondaryPolesAllowed?: boolean;
      /**
       * Role's type
       */
      typeOf?: "manager" | "intranet";
      /**
       * true if the role has role been created by the system
       */
      isSystem?: boolean;
    };
  }[];
}

// ─── times ───
/**
 * List of times
 */
export interface SchemasTimesSearchJson {
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
    type: "time";
    attributes?: {
      category?: "regular" | "exceptional";
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
      /**
       * If it is a new line then row should be inferior or equal to 0
       */
      row?: number;
      startDate?: string;
      endDate?: string;
      duration?: number;
    };
    relationships?: {
      /**
       * Time's timesheet
       */
      timesReport?: {
        data: {
          id: string;
          type: "timesreport";
        };
      };
      delivery?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "delivery";
            };
          };
      batch?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "batch";
            };
          };
      project?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "project";
            };
          };
    };
  }[];
  included?: (
    | {
        id: string;
        type: "timesreport";
        attributes?: {
          term?: string;
          state?: "savedAndNoValidation" | "waitingForValidation" | "validated" | "rejected";
          workUnitRate?: number;
        };
        relationships?: {
          /**
           * Timesheet's agency
           */
          agency?: {
            data: {
              id: string;
              type: "agency";
            };
          };
          /**
           * Timesheet's resource
           */
          resource?: {
            data: {
              id: string;
              type: "resource";
            };
          };
        };
      }
    | {
        id: string;
        type: "delivery";
        attributes?: {
          title?: string;
        };
      }
    | {
        id: string;
        type: "batch";
        attributes?: {
          title?: string;
        };
      }
    | {
        id: string;
        type: "project";
        attributes?: {
          reference?: string;
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
        };
      }
    | {
        id: string;
        type: "company";
        attributes?: {
          name?: string;
        };
      }
    | {
        id: string;
        type: "agency";
        attributes?: {
          name?: string;
          workUnitRate?: "notUsed" | number;
        };
      }
    | {
        id: string;
        type: "resource";
        attributes?: {
          firstName?: string;
          lastName?: string;
          workUnitRate?: "notUsed" | number;
        };
      }
  )[];
}

// ─── payments ───
/**
 * List of payments
 */
export interface SchemasPaymentsSearchJson {
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
      amountExcludingTax?: number;
      /**
       * amountExcludingTax * (1 + taxRate / 100)
       */
      amountIncludingTax?: number;
    };
  };
  data: {
    id: string;
    type: "payment";
    attributes?: {
      date?: string;
      performedDate?: string;
      expectedDate?: string;
      state?: number;
      number?: string;
      amountExcludingTax?: number;
      /**
       * amountExcludingTax * (1 + taxRate / 100)
       */
      amountIncludingTax?: number;
      /**
       * number of files related to the payments
       */
      numberOfFiles?: number;
      /**
       * If false then payment is not accessible
       */
      canWritePayment?: boolean;
      creationDate?: string;
      updateDate?: string;
    };
    relationships?: {
      /**
       * Payment's purchase
       */
      purchase?: {
        data: {
          id: string;
          type: "purchase";
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
    };
  }[];
  included?: (
    | {
        id: string;
        type: "purchase";
        attributes?: {
          title?: string;
          subscription?: number;
          typeOf?: number;
          reference?: string;
          currency?: number;
          exchangeRate?: number;
          currencyAgency?: number;
          exchangeRateAgency?: number;
        };
        relationships?: {
          /**
           * Purchase's main manager
           */
          mainManager?: {
            data: {
              id: string;
              type: "resource";
            };
          };
          project?:
            | {
                data: null;
              }
            | {
                data: {
                  id: string;
                  type: "project";
                };
              };
          delivery?:
            | {
                data: null;
              }
            | {
                data: {
                  id: string;
                  type: "delivery";
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
           * Purchase's agency
           */
          agency?: {
            data: {
              id: string;
              type: "agency";
            };
          };
          /**
           * Purchase's pole
           */
          pole?: {
            data: {
              id: string;
              type: "pole";
            };
          };
        };
      }
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
        type: "project";
        attributes?: {
          reference?: string;
        };
      }
    | {
        id: string;
        type: "contact";
        attributes?: {
          firstName?: string;
          lastName?: string;
        };
      }
    | {
        id: string;
        type: "company";
        attributes?: {
          name?: string;
        };
      }
    | {
        id: string;
        type: "delivery";
        attributes?: {
          title?: string;
        };
        relationships?: {
          dependsOn?: {
            data: {
              id: string;
              type: "resource";
            };
          };
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

// ─── accounts ───
/**
 * List of resources
 */
export interface SchemasAccountsSearchJson {
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
    type: "account";
    attributes?: {
      firstName?: string;
      lastName?: string;
      typeOf?: number;
      level?: "manager" | "resource" | "administrator";
      isOwner?: boolean;
      login?: string;
      /**
       * If true then this resource can log in Boond
       */
      subscription?: "active" | "inactive";
      /**
       * If false then account is not editable
       */
      canWriteAccount?: boolean;
      /**
       * If false then connection is forbidden
       */
      canConnectAccount?: boolean;
      /**
       * If false then deletion is forbidden
       */
      canDeleteAccount?: boolean;
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
      role?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "role";
            };
          };
    };
  }[];
  included?: (
    | {
        id: string;
        type: "resource";
        attributes?: {
          lastName?: string;
          firstName?: string;
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
        type: "role";
        attributes?: {
          name?: string;
        };
      }
  )[];
}

// ─── contacts ───
/**
 * List of contacts
 */
export interface SchemasContactsSearchJson {
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
    type: "contact";
    attributes?: {
      creationDate?: string;
      civility?: number;
      thumbnail?: string;
      firstName?: string;
      lastName?: string;
      state?: number;
      function?: string;
      department?: string;
      email1?: string;
      email2?: string;
      email3?: string;
      phone1?: string;
      phone2?: string;
      town?: string;
      country?: string;
      updateDate?: string;
      /**
       * If false then contact is not accessible
       */
      canReadContact?: boolean;
      /**
       * If false then contact is not editable
       */
      canWriteContact?: boolean;
      /**
       * If false then contact can not show action
       */
      canShowAction?: boolean;
      typesOf?: string[];
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
       * Contact's main manager
       */
      mainManager?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Contact's company
       */
      company?: {
        data: {
          id: string;
          type: "company";
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
      /**
       * Contact's agency
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
       * Contact's previous action
       */
      previousAction?: {
        data: {
          id: string;
          type: "action";
        };
      };
      /**
       * Contact's next action
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
        type: "company";
        attributes?: {
          name?: string;
          expertiseArea?: string;
          thumbnail?: string;
          state?: number;
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

// ─── absencesReports ───
/**
 * List of requests of absences
 */
export interface SchemasAbsencesReportsSearchJson {
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
    type: "absencesreport";
    attributes?: {
      creationDate?: string;
      state?: "savedAndNoValidation" | "waitingForValidation" | "validated" | "rejected";
      /**
       * List of absences periods
       */
      absencesPeriods?: {
        id: string;
        startDate: string;
        /**
         * The value have to be superior or equal to startDate
         */
        endDate: string;
        duration: number;
        title?: string;
        workUnitType: {
          reference: number;
          activityType:
            | "production"
            | "absence"
            | "internal"
            | "exceptionalTime"
            | "exceptionalCalendar";
          name: string;
        };
      }[];
    };
    relationships?: {
      /**
       * Absences request's agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
        };
      };
      /**
       * Absences request's resource
       */
      resource?: {
        data: {
          id: string;
          type: "resource";
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
  )[];
}

/**
 * Request of absences basic data
 */
export interface SchemasAbsencesReportsProfileJson {
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
    warnings?: {
      /**
       * Warning's code
       */
      code: "moreThanAbsenceAccountAcquired";
      /**
       * Warning's message
       */
      detail: string;
      workUnitType: {
        reference: number;
        name: string;
      };
    }[];
    expectedValidatorsAllowedForValidate?: {
      id: string;
      firstName: string;
      lastName: string;
    }[];
    expectedValidatorsAllowedForUnvalidate?: {
      id: string;
      firstName: string;
      lastName: string;
    }[];
    expectedValidatorsAllowedForReject?: {
      id: string;
      firstName: string;
      lastName: string;
    }[];
  };
  data: {
    id: string;
    type: "absencesreport";
    attributes?: {
      creationDate?: string;
      updateDate?: string;
      state?: "savedAndNoValidation" | "waitingForValidation" | "validated" | "rejected";
      informationComments?: string;
      /**
       * List of absences periods
       */
      absencesPeriods?: {
        id: string;
        startDate: string;
        /**
         * The value have to be superior or equal to startDate
         */
        endDate: string;
        duration: number;
        title?: string;
        workUnitType: {
          reference: number;
          activityType:
            | "production"
            | "absence"
            | "internal"
            | "exceptionalTime"
            | "exceptionalCalendar";
          name: string;
        };
      }[];
      absencesQuestions?: {
        question: string;
        answer: boolean;
      }[];
    };
    relationships?: {
      /**
       * Request of absences resource
       */
      resource?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      createdBy?:
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
       * Request of absences agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
        };
      };
      /**
       * List of timesheet's files
       */
      files?: {
        data: {
          id: string;
          type: "document";
        }[];
      };
      /**
       * List of request of absences validations
       */
      validations?: {
        data: {
          id: string;
          type: "validation";
        }[];
      };
      /**
       * Request of absences expected validators
       */
      validationWorkflow?: {
        data: {
          id: string;
          type: "resource";
        }[];
      };
      /**
       * Absences accounts
       */
      absencesAccounts?: {
        data?: {
          id: string;
          type: "absencesaccount";
        }[];
      };
    };
  };
  /**
   * @minItems 1
   */
  included?: [
    (
      | {
          id: string;
          type: "resource";
          attributes?: {
            firstName?: string;
            lastName?: string;
            function?: string;
            workUnitTypesAllowed?: {
              reference: number;
              name: string;
              activityType:
                | "production"
                | "absence"
                | "internal"
                | "exceptionalTime"
                | "exceptionalCalendar";
            }[];
            workUnitRate?: "notUsed" | number;
          };
          relationships?: {
            /**
             * Agency
             */
            agency?: {
              data?: {
                id?: string;
                type?: "agency";
              };
            };
            /**
             * Absences Reports
             */
            absencesReports?: {
              data?: {
                id?: string;
                type?: "absencesreport";
              }[];
            };
            /**
             * Mandatory leaves
             */
            mandatoryLeaves?: {
              data?: {
                id?: string;
                type?: "mandatoryleave";
              }[];
            };
            /**
             * Resource's contracts/amendments
             */
            contracts?: {
              data: {
                id: string;
                type: "contract";
              }[];
            };
          };
        }
      | {
          id: string;
          type: "agency";
          attributes?: {
            name?: string;
            workUnitRate?: "notUsed" | number;
            calendar?: string;
            absencesLegals?: string;
            absencesReportsQuestions?: {
              question: string;
            }[];
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
          type: "validation";
          attributes?: {
            date?: string;
            state?: "waitingForValidation" | "validated" | "rejected";
            reason?: string;
          };
          relationships?: {
            realValidator?:
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
             * Validation's expected validator
             */
            expectedValidator?: {
              data: {
                id: string;
                type: "resource";
              };
            };
          };
        }
      | {
          id: string;
          type: "validation";
          attributes?: {
            period?:
              | "JanuaryToDecember"
              | "FebruaryToJanuary"
              | "MarchToFebruary"
              | "AprilToMarch"
              | "MayToApril"
              | "JuneToMay"
              | "JulyToJune"
              | "AugustToJuly"
              | "SeptemberToAugust"
              | "OctoberToSeptember"
              | "NovemberToOctober"
              | "DecemberToNovember";
            year?: number;
            amountAcquired?: number;
            /**
             * Sum of all times used on acquired's absences with this work unit type & including in this term
             */
            amountAcquiredUsed?: number;
            amountBeingAcquired?: number;
            /**
             * Sum of all periods asked on acquired's absences with this work unit type & including in this term
             */
            amountAcquiredAsked?: number;
            /**
             * Sum of all periods asked on being acquired's absences with this work unit type & including in this term
             */
            amountBeingAcquiredAsked?: number;
            /**
             * Sum of all times used on being acquired's absences with this work unit type & including in this term
             */
            amountBeingAcquiredUsed?: number;
            /**
             * amountAcquired - amountAcquiredAsked
             */
            deltaAcquiredAsked?: number;
            /**
             * amountAcquired - amountAcquiredUsed
             */
            deltaAcquiredUsed?: number;
            /**
             * amountBeingAcquired - amountBeingAcquiredAsked
             */
            deltaBeingAcquiredAsked?: number;
            /**
             * amountBeingAcquired - amountBeingAcquiredUsed
             */
            deltaBeingAcquiredUsed?: number;
            useBeingAcquired?:
              | "inactive"
              | "allowTakenAbsencesOnBeingAcquired"
              | "forbidTakenAbsencesOnBeingAcquired";
            /**
             * true if absence's account is set for this resource, false if it does not exist but the resource has only take time of this type
             */
            isQuotaExists?: boolean;
            automaticDescription?: {
              date: string;
              previousAmountBeingAcquired: number | null;
              newAmountBeingAcquired: number;
              previousAmountAcquired: number | null;
              newAmountAcquired: number;
            }[];
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
          };
          relationships?: {
            /**
             * Request of absences agency
             */
            agency?: {
              data: {
                id: string;
                type: "agency";
              };
            };
          };
        }
      | {
          id: string;
          type: "absencesreport";
          attributes?: {
            state?: "savedAndNoValidation" | "waitingForValidation" | "validated" | "rejected";
            /**
             * List of absences periods
             */
            absencesPeriods?: {
              id: string;
              startDate: string;
              /**
               * The value have to be superior or equal to startDate
               */
              endDate: string;
              duration: number;
              title?: string;
              workUnitType: {
                reference: number;
                activityType:
                  | "production"
                  | "absence"
                  | "internal"
                  | "exceptionalTime"
                  | "exceptionalCalendar";
                name: string;
              };
            }[];
          };
        }
      | {
          id: string;
          type: "contract";
          attributes?: {
            startDate?: string;
            endDate?: string;
            calendar?: string;
            partialWorkTimes?: string[];
            isPartialWorkTimeEvenOdd?: boolean;
          };
          relationships?: {
            /**
             * Contract's agency
             */
            agency?: {
              data: {
                id: string;
                type: "agency";
              };
            };
          };
        }
    ),
    ...(
      | {
          id: string;
          type: "resource";
          attributes?: {
            firstName?: string;
            lastName?: string;
            function?: string;
            workUnitTypesAllowed?: {
              reference: number;
              name: string;
              activityType:
                | "production"
                | "absence"
                | "internal"
                | "exceptionalTime"
                | "exceptionalCalendar";
            }[];
            workUnitRate?: "notUsed" | number;
          };
          relationships?: {
            /**
             * Agency
             */
            agency?: {
              data?: {
                id?: string;
                type?: "agency";
              };
            };
            /**
             * Absences Reports
             */
            absencesReports?: {
              data?: {
                id?: string;
                type?: "absencesreport";
              }[];
            };
            /**
             * Mandatory leaves
             */
            mandatoryLeaves?: {
              data?: {
                id?: string;
                type?: "mandatoryleave";
              }[];
            };
            /**
             * Resource's contracts/amendments
             */
            contracts?: {
              data: {
                id: string;
                type: "contract";
              }[];
            };
          };
        }
      | {
          id: string;
          type: "agency";
          attributes?: {
            name?: string;
            workUnitRate?: "notUsed" | number;
            calendar?: string;
            absencesLegals?: string;
            absencesReportsQuestions?: {
              question: string;
            }[];
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
          type: "validation";
          attributes?: {
            date?: string;
            state?: "waitingForValidation" | "validated" | "rejected";
            reason?: string;
          };
          relationships?: {
            realValidator?:
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
             * Validation's expected validator
             */
            expectedValidator?: {
              data: {
                id: string;
                type: "resource";
              };
            };
          };
        }
      | {
          id: string;
          type: "validation";
          attributes?: {
            period?:
              | "JanuaryToDecember"
              | "FebruaryToJanuary"
              | "MarchToFebruary"
              | "AprilToMarch"
              | "MayToApril"
              | "JuneToMay"
              | "JulyToJune"
              | "AugustToJuly"
              | "SeptemberToAugust"
              | "OctoberToSeptember"
              | "NovemberToOctober"
              | "DecemberToNovember";
            year?: number;
            amountAcquired?: number;
            /**
             * Sum of all times used on acquired's absences with this work unit type & including in this term
             */
            amountAcquiredUsed?: number;
            amountBeingAcquired?: number;
            /**
             * Sum of all periods asked on acquired's absences with this work unit type & including in this term
             */
            amountAcquiredAsked?: number;
            /**
             * Sum of all periods asked on being acquired's absences with this work unit type & including in this term
             */
            amountBeingAcquiredAsked?: number;
            /**
             * Sum of all times used on being acquired's absences with this work unit type & including in this term
             */
            amountBeingAcquiredUsed?: number;
            /**
             * amountAcquired - amountAcquiredAsked
             */
            deltaAcquiredAsked?: number;
            /**
             * amountAcquired - amountAcquiredUsed
             */
            deltaAcquiredUsed?: number;
            /**
             * amountBeingAcquired - amountBeingAcquiredAsked
             */
            deltaBeingAcquiredAsked?: number;
            /**
             * amountBeingAcquired - amountBeingAcquiredUsed
             */
            deltaBeingAcquiredUsed?: number;
            useBeingAcquired?:
              | "inactive"
              | "allowTakenAbsencesOnBeingAcquired"
              | "forbidTakenAbsencesOnBeingAcquired";
            /**
             * true if absence's account is set for this resource, false if it does not exist but the resource has only take time of this type
             */
            isQuotaExists?: boolean;
            automaticDescription?: {
              date: string;
              previousAmountBeingAcquired: number | null;
              newAmountBeingAcquired: number;
              previousAmountAcquired: number | null;
              newAmountAcquired: number;
            }[];
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
          };
          relationships?: {
            /**
             * Request of absences agency
             */
            agency?: {
              data: {
                id: string;
                type: "agency";
              };
            };
          };
        }
      | {
          id: string;
          type: "absencesreport";
          attributes?: {
            state?: "savedAndNoValidation" | "waitingForValidation" | "validated" | "rejected";
            /**
             * List of absences periods
             */
            absencesPeriods?: {
              id: string;
              startDate: string;
              /**
               * The value have to be superior or equal to startDate
               */
              endDate: string;
              duration: number;
              title?: string;
              workUnitType: {
                reference: number;
                activityType:
                  | "production"
                  | "absence"
                  | "internal"
                  | "exceptionalTime"
                  | "exceptionalCalendar";
                name: string;
              };
            }[];
          };
        }
      | {
          id: string;
          type: "contract";
          attributes?: {
            startDate?: string;
            endDate?: string;
            calendar?: string;
            partialWorkTimes?: string[];
            isPartialWorkTimeEvenOdd?: boolean;
          };
          relationships?: {
            /**
             * Contract's agency
             */
            agency?: {
              data: {
                id: string;
                type: "agency";
              };
            };
          };
        }
    )[],
  ];
}

/**
 * Empty request of absences default basic data
 */
export interface SchemasAbsencesReportsDefaultJson {
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
    warnings?: {
      /**
       * Warning's code
       */
      code: "moreThanAbsenceAccountAcquired";
      /**
       * Warning's message
       */
      detail: string;
      workUnitType: {
        reference: number;
        name: string;
      };
    }[];
    expectedValidatorsAllowedForValidate?: {
      id: string;
      firstName: string;
      lastName: string;
    }[];
    expectedValidatorsAllowedForUnvalidate?: {
      id: string;
      firstName: string;
      lastName: string;
    }[];
    expectedValidatorsAllowedForReject?: {
      id: string;
      firstName: string;
      lastName: string;
    }[];
  };
  data: {
    id: "0";
    type: "absencesreport";
    relationships?: {
      /**
       * Request of absences resource
       */
      resource?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Request of absences agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
        };
      };
      /**
       * Timesheet's expected validators
       */
      validationWorkflow?: {
        data: {
          id: string;
          type: "resource";
        }[];
      };
      /**
       * Absences accounts
       */
      absencesAccounts?: {
        data?: {
          id: string;
          type: "absencesaccount";
        }[];
      };
    };
  };
  included?: (
    | {
        id: string;
        type: "resource";
        attributes?: {
          firstName?: string;
          lastName?: string;
          function?: string;
          workUnitTypesAllowed?: {
            reference: number;
            name: string;
            activityType:
              | "production"
              | "absence"
              | "internal"
              | "exceptionalTime"
              | "exceptionalCalendar";
          }[];
          workUnitRate?: "notUsed" | number;
        };
      }
    | {
        id: string;
        type: "agency";
        attributes?: {
          name?: string;
          workUnitRate?: "notUsed" | number;
          calendar?: string;
          absencesReportsQuestions?: {
            question: string;
          }[];
        };
      }
    | {
        id: string;
        type: "validation";
        attributes?: {
          period?:
            | "JanuaryToDecember"
            | "FebruaryToJanuary"
            | "MarchToFebruary"
            | "AprilToMarch"
            | "MayToApril"
            | "JuneToMay"
            | "JulyToJune"
            | "AugustToJuly"
            | "SeptemberToAugust"
            | "OctoberToSeptember"
            | "NovemberToOctober"
            | "DecemberToNovember";
          year?: number;
          amountAcquired?: number;
          /**
           * Sum of all times used on acquired's absences with this work unit type & including in this term
           */
          amountAcquiredUsed?: number;
          amountBeingAcquired?: number;
          /**
           * Sum of all periods asked on acquired's absences with this work unit type & including in this term
           */
          amountAcquiredAsked?: number;
          /**
           * Sum of all periods asked on being acquired's absences with this work unit type & including in this term
           */
          amountBeingAcquiredAsked?: number;
          /**
           * Sum of all times used on being acquired's absences with this work unit type & including in this term
           */
          amountBeingAcquiredUsed?: number;
          /**
           * amountAcquired - amountAcquiredAsked
           */
          deltaAcquiredAsked?: number;
          /**
           * amountAcquired - amountAcquiredUsed
           */
          deltaAcquiredUsed?: number;
          /**
           * amountBeingAcquired - amountBeingAcquiredAsked
           */
          deltaBeingAcquiredAsked?: number;
          /**
           * amountBeingAcquired - amountBeingAcquiredUsed
           */
          deltaBeingAcquiredUsed?: number;
          useBeingAcquired?:
            | "inactive"
            | "allowTakenAbsencesOnBeingAcquired"
            | "forbidTakenAbsencesOnBeingAcquired";
          /**
           * true if absence's account is set for this resource, false if it does not exist but the resource has only take time of this type
           */
          isQuotaExists?: boolean;
          automaticDescription?: {
            date: string;
            previousAmountBeingAcquired: number | null;
            newAmountBeingAcquired: number;
            previousAmountAcquired: number | null;
            newAmountAcquired: number;
          }[];
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
        };
        relationships?: {
          /**
           * Request of absences agency
           */
          agency?: {
            data: {
              id: string;
              type: "agency";
            };
          };
        };
      }
  )[];
}

/**
 * Request of absences rights
 */
export interface SchemasAbsencesReportsRightsJson {
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
  };
  data: {
    id: string;
    type: "rights";
    attributes?: {
      actions?: {
        /**
         * true if this action is available
         */
        share?: boolean;
        /**
         * true if this action is available
         */
        seeThreads?: boolean;
        /**
         * true if this action is available
         */
        validate?: boolean;
        /**
         * true if this action is available
         */
        reject?: boolean;
        /**
         * true if this action is available
         */
        unvalidate?: boolean;
        /**
         * true if this action is available
         */
        downloadInternalPDF?: boolean;
        /**
         * true if this action is available
         */
        exportToDownloadCenter?: boolean;
        /**
         * true if this action is available
         */
        deleteValidators?: boolean;
        /**
         * true if this action is available
         */
        seeLogs?: boolean;
      };
      apis?: {
        entity?: {
          /**
           * true if the user can read this api
           */
          read: boolean;
          /**
           * true if the user can write this api
           */
          write: boolean;
        };
      };
      attributes?: {
        files?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        absencesAccounts?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        absencesQuestions?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
      };
    };
  };
}

/**
 * Request of absences basic data sent in the body with a POST method
 */
export interface SchemasAbsencesReportsBodyPostJson {
  data: {
    type: "absencesreport";
    attributes?: {
      creationDate?: string;
      informationComments?: string;
      /**
       * List of absences periods
       */
      absencesPeriods?: (
        | {
            startDate: string;
            /**
             * The value have to be superior or equal to startDate
             */
            endDate: string;
            duration: number;
            title: string;
            workUnitType: {
              reference: number;
            };
          }
        | {
            id: string;
            startDate: string;
            /**
             * The value have to be superior or equal to startDate
             */
            endDate: string;
            duration: number;
            title: string;
            workUnitType: {
              reference: number;
            };
          }
      )[];
      absencesQuestions?: {
        question: string;
        answer: boolean;
      }[];
    };
    relationships: {
      /**
       * Request of absences resource
       */
      resource: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Request of absences agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
        };
      };
    };
  };
}

/**
 * Request of absences basic data sent in the body with a PUT method
 */
export interface SchemasAbsencesReportsBodyPutJson {
  data: {
    id: string;
    type: "absencesreport";
    attributes?: {
      informationComments?: string;
      /**
       * List of absences periods
       */
      absencesPeriods?: (
        | {
            startDate: string;
            /**
             * The value have to be superior or equal to startDate
             */
            endDate: string;
            duration: number;
            title: string;
            workUnitType: {
              reference: number;
            };
          }
        | {
            id: string;
            startDate: string;
            /**
             * The value have to be superior or equal to startDate
             */
            endDate: string;
            duration: number;
            title: string;
            workUnitType: {
              reference: number;
            };
          }
      )[];
      absencesQuestions?: {
        question: string;
        answer: boolean;
      }[];
    };
  };
}

/**
 * Absences request's validation reject data sent in the body with a POST method
 */
export interface SchemasAbsencesReportsRejectPostJson {
  data: {
    /**
     * Resource's `id` on which absences request depends
     */
    expectedValidator: number;
    reason: string;
    rejectTypeOf:
      | "correctionForPreviousValidator"
      | "correctionForAllValidators"
      | "definitiveRefusal";
  };
}

// ─── businessUnits ───
/**
 * List of business units
 */
export interface SchemasBusinessUnitsSearchJson {
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
    type: "businessunit";
    attributes?: {
      name?: string;
    };
    relationships?: {
      /**
       * Business unit's managers
       */
      includedManagers?: {
        data: {
          id: string;
          type: "resource";
        }[];
      };
    };
  }[];
  included?: {
    id: string;
    type: "resource";
    attributes?: {
      firstName?: string;
      lastName?: string;
    };
  }[];
}

/**
 * Business unit's basic data
 */
export interface SchemasBusinessUnitsProfileJson {
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
    managers?: {
      id: string;
      firstName: string;
      lastName: string;
    }[];
  };
  data: {
    id: string;
    type: "businessunit";
    attributes?: {
      creationDate?: string;
      updateDate?: string;
      name?: string;
    };
    relationships?: {
      /**
       * Business unit's managers
       */
      includedManagers?: {
        data: {
          id: string;
          type: "resource";
        }[];
      };
      /**
       * Business unit's excluded managers in search
       */
      excludedManagersInSearch?: {
        data: {
          id: string;
          type: "resource";
        }[];
      };
      createdBy?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "resource";
            };
          };
    };
  };
  included?: {
    id: string;
    type: "resource";
    attributes?: {
      firstName?: string;
      lastName?: string;
    };
  }[];
}

/**
 * Empty business unit's default information data
 */
export interface SchemasBusinessUnitsDefaultJson {
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
    managers?: {
      id: string;
      firstName: string;
      lastName: string;
    }[];
  };
  data: {
    id: "0";
    type: "businessunit";
  };
}

/**
 * Business unit's basic data sent in the body with a POST method
 */
export interface SchemasBusinessUnitsBodyPostJson {
  data: {
    type: "businessunit";
    attributes: {
      name: string;
    };
    relationships?: {
      /**
       * Business unit's managers
       */
      includedManagers?: {
        data: {
          id: string;
          type: "resource";
        }[];
      };
      /**
       * Business unit's excluded managers in search
       */
      excludedManagersInSearch?: {
        data: {
          id: string;
          type: "resource";
        }[];
      };
    };
  };
}

/**
 * Business unit's basic data sent in the body with a POST method
 */
export interface SchemasBusinessUnitsBodyPutJson {
  data: {
    id: string;
    type: "businessunit";
    attributes?: {
      name?: string;
    };
    relationships?: {
      /**
       * Business unit's managers
       */
      includedManagers?: {
        data: {
          id: string;
          type: "resource";
        }[];
      };
      /**
       * Business unit's excluded managers in search
       */
      excludedManagersInSearch?: {
        data: {
          id: string;
          type: "resource";
        }[];
      };
    };
  };
}

// ─── expensesReports ───
/**
 * List of expenses
 */
export interface SchemasExpensesReportsSearchJson {
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
     * true if certification is enabled on at least one agency
     */
    canExportCertified?: boolean;
  };
  data: {
    id: string;
    type: "expensesreport";
    attributes?: {
      term?: string;
      state?: "savedAndNoValidation" | "waitingForValidation" | "validated" | "rejected";
      paid?: boolean;
      closed?: boolean;
    };
    relationships?: {
      /**
       * Expenses agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
        };
      };
      /**
       * Expenses resource
       */
      resource?: {
        data: {
          id: string;
          type: "resource";
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
  )[];
}

/**
 * Expenses basic data
 */
export interface SchemasExpensesReportsProfileJson {
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
    warnings?: {
      /**
       * Warning's code
       */
      code:
        | "noDeliveryOnProject"
        | "projectDoesNotExist"
        | "deliveryDoesNotExist"
        | "expensesOutsideContractDates"
        | "expensesOutsideDeliveryDates";
      /**
       * Warning's message
       */
      detail: string;
      project:
        | {
            data: null;
          }
        | {
            id: string;
            reference: string;
          };
      delivery:
        | {
            data: null;
          }
        | {
            id: string;
            title: string;
            startDate: string;
            endDate: string;
            calendar: string;
          };
    }[];
    expectedValidatorsAllowedForValidate?: {
      id: string;
      firstName: string;
      lastName: string;
    }[];
    expectedValidatorsAllowedForUnvalidate?: {
      id: string;
      firstName: string;
      lastName: string;
    }[];
    expectedValidatorsAllowedForReject?: {
      id: string;
      firstName: string;
      lastName: string;
    }[];
    /**
     * true if ai parsing is enabled
     */
    isParsingEnabled?: boolean;
    /**
     * Control help: warning if resource is already invited
     */
    guestsWarning?: {
      /**
       * guestHaveExpense, guestAlreadyGuest or ownerAlreadyGuest
       */
      type: string;
      startDate: string;
      expenseReport: {
        id?: string;
        canRead?: boolean;
        resource?: {
          id?: string;
          fullname?: string;
        };
      };
      expenseType: {
        name?: string;
      };
      guest?: {
        id?: string;
        fullname?: string;
      };
    }[];
  };
  data: {
    id: string;
    type: "expensesreport";
    attributes?: {
      creationDate?: string;
      updateDate?: string;
      term?: string;
      informationComments?: string;
      closed?: boolean;
      state?: "savedAndNoValidation" | "waitingForValidation" | "validated" | "rejected";
      ratePerKilometerType?: {
        reference: number;
        name: string;
        amount: number;
      };
      paid?: boolean;
      advance?: number;
      currencyAgency?: number;
      exchangeRateAgency?: number;
      /**
       * List of actual expenses
       */
      actualExpenses?: {
        id: string;
        startDate: string;
        number: number;
        title: string;
        currency: number;
        exchangeRate: number;
        numberOfKilometers: number;
        /**
         * If kilometer expenses then numberOfKilometers * ratePerKilometerType else cf. database
         */
        amountIncludingTax: number;
        tax: number;
        reinvoiced: boolean;
        isKilometricExpense: boolean;
        activityType: "production" | "absence" | "internal";
        file?: string;
        expenseType:
          | {
              data: null;
            }
          | (null | {
              reference: number;
              taxRate: number;
              name: string;
              guest?: boolean;
              mealDeduction?: boolean;
              position?: number;
            });
        delivery:
          | {
              data: null;
            }
          | {
              id: string;
              title?: string;
              startDate?: string;
              endDate?: string;
            };
        batch:
          | {
              data: null;
            }
          | {
              id: string;
              title?: string;
            };
        project:
          | {
              data: null;
            }
          | {
              id: string;
              reference?: string;
            };
        guestResources?: {
          id?: string;
          lastName?: string;
          firstName?: string;
          thumbnail?: string;
        }[];
        guestResourcesManual?: string[];
        guestContacts?: {
          id?: string;
          lastName?: string;
          firstName?: string;
          thumbnail?: string;
        }[];
        guestContactsManual?: string[];
        guestCandidates?: {
          id?: string;
          lastName?: string;
          firstName?: string;
          thumbnail?: string;
        }[];
        guestCandidatesManual?: string[];
      }[];
      /**
       * List of fixed expenses
       */
      fixedExpenses?: {
        id: string;
        startDate: string;
        /**
         * If it is a new line then row should be inferior or equal to 0
         */
        row: number;
        numberOfKilometers: number;
        /**
         * If kilometer expenses then numberOfKilometers * ratePerKilometerType else cf. database
         */
        amountIncludingTax: number;
        isKilometricExpense: boolean;
        activityType: "production" | "absence" | "internal";
        expenseType:
          | {
              data: null;
            }
          | (null | {
              reference: number;
              taxRate: number;
              name: string;
              guest?: boolean;
              mealDeduction?: boolean;
              position?: number;
            });
        delivery:
          | {
              data: null;
            }
          | {
              id: string;
              title?: string;
              startDate?: string;
              endDate?: string;
            };
        batch:
          | {
              data: null;
            }
          | {
              id: string;
              title?: string;
            };
        project:
          | {
              data: null;
            }
          | {
              id: string;
              reference?: string;
            };
      }[];
      /**
       * List of projects expenses
       */
      projectsExpenses?: {
        startDate: string;
        /**
         * If it is a new line then row should be inferior or equal to 0
         */
        row: number;
        numberOfKilometers: number;
        /**
         * If kilometer expenses then numberOfKilometers * ratePerKilometerType else cf. database
         */
        amountIncludingTax: number;
        isKilometricExpense: boolean;
        activityType: "production" | "absence" | "internal";
        expenseType:
          | {
              data: null;
            }
          | (null | {
              reference: number;
              taxRate: number;
              name: string;
              guest?: boolean;
              mealDeduction?: boolean;
              position?: number;
            });
        /**
         * Delivery on which fixed expenses depends
         */
        delivery: {
          id: string;
          title?: string;
          startDate?: string;
          endDate?: string;
        };
        /**
         * Project on which fixed expenses depends
         */
        project: {
          id: string;
          reference?: string;
        };
      }[];
    };
    relationships?: {
      /**
       * Expenses resource
       */
      resource?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      createdBy?:
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
       * Expenses agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
        };
      };
      /**
       * List of expenses files
       */
      files?: {
        data: {
          id: string;
          type: "document";
        }[];
      };
      timesReport?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "timesreport";
            };
          };
      /**
       * List of expenses orders available on this term
       */
      orders?: {
        data: {
          id: string;
          type: "order";
        }[];
      };
      /**
       * List of expenses projects available on this term
       */
      projects?: {
        data: {
          id: string;
          type: "project";
        }[];
      };
      /**
       * List of expenses validations
       */
      validations?: {
        data: {
          id: string;
          type: "validation";
        }[];
      };
      /**
       * Expenses expected validators
       */
      validationWorkflow?: {
        data: {
          id: string;
          type: "resource";
        }[];
      };
      /**
       * Expenses certification
       */
      certification?: {
        data: {
          id: string;
          type: "expenseshistory";
        };
      };
    };
  };
  /**
   * @minItems 1
   */
  included?: [
    (
      | {
          id: string;
          type: "resource";
          attributes?: {
            firstName?: string;
            lastName?: string;
            function?: string;
          };
          relationships?: {
            /**
             * Resource's contracts/amendments
             */
            contracts?: {
              data: {
                id: string;
                type: "contract";
              }[];
            };
          };
        }
      | {
          id: string;
          type: "agency";
          attributes?: {
            name?: string;
            calendar?: string;
            currency?: number;
            exchangeRate?: number;
            /**
             * Agency's expense types
             */
            expenseTypes?: {
              reference: number;
              name: string;
              taxRate: number;
            }[];
            /**
             * Agency's rate per kilometer types
             */
            ratePerKilometerTypes?: {
              reference: number;
              name: string;
              amount: number;
            }[];
            expensesLegals?: string;
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
          type: "delivery";
          attributes?: {
            title?: string;
            startDate?: string;
            endDate?: string;
            calendar?: string;
            /**
             * List of expenses details
             */
            expensesDetails?: {
              id: string;
              expenseType: {
                reference: number;
                name: string;
              };
              periodicity: "daily" | "monthly";
              netAmount: number;
              /**
               * Agency on which expenses detail depends
               */
              agency: {
                id: string;
                name: string;
              };
            }[];
          };
        }
      | {
          id: string;
          type: "batch";
          attributes?: {
            title?: string;
          };
        }
      | {
          id: string;
          type: "project";
          attributes?: {
            reference?: string;
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
            /**
             * List of project's deliveries available on this term
             */
            deliveries?: unknown[];
            /**
             * List of project's batches available on this term
             */
            batches?: unknown[];
          };
        }
      | {
          id: string;
          type: "company";
          attributes?: {
            name?: string;
          };
        }
      | {
          id: string;
          type: "validation";
          attributes?: {
            date?: string;
            state?: "waitingForValidation" | "validated" | "rejected";
            reason?: string;
          };
          relationships?: {
            realValidator?:
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
             * Validation's expected validator
             */
            expectedValidator?: {
              data: {
                id: string;
                type: "resource";
              };
            };
          };
        }
      | {
          id: string;
          type: "timesreport";
          attributes?: {
            /**
             * List of regular times
             */
            regularTimes?: {
              id: string;
              startDate: string;
              duration: number;
              /**
               * If it is a new line then row should be inferior or equal to 0
               */
              row: number;
              workUnitType: {
                reference: number;
                activityType:
                  | "production"
                  | "absence"
                  | "internal"
                  | "exceptionalTime"
                  | "exceptionalCalendar";
                name: string;
              };
              calendar?: string;
              delivery:
                | {
                    data: null;
                  }
                | {
                    id: string;
                    title?: string;
                    startDate?: string;
                    endDate?: string;
                  };
              batch:
                | {
                    data: null;
                  }
                | {
                    id: string;
                    title?: string;
                  };
              project:
                | {
                    data: null;
                  }
                | {
                    id: string;
                    reference?: string;
                  };
            }[];
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
          type: "expenseshistory";
          attributes?: {
            updateDate?: string;
            state?: 0 | 1 | 2;
            errorMsg?: string;
          };
        }
      | {
          id: string;
          type: "contract";
          attributes?: {
            startDate?: string;
            endDate?: string;
            calendar?: string;
          };
          relationships?: {
            /**
             * Contract's agency
             */
            agency?: {
              data: {
                id: string;
                type: "agency";
              };
            };
          };
        }
    ),
    ...(
      | {
          id: string;
          type: "resource";
          attributes?: {
            firstName?: string;
            lastName?: string;
            function?: string;
          };
          relationships?: {
            /**
             * Resource's contracts/amendments
             */
            contracts?: {
              data: {
                id: string;
                type: "contract";
              }[];
            };
          };
        }
      | {
          id: string;
          type: "agency";
          attributes?: {
            name?: string;
            calendar?: string;
            currency?: number;
            exchangeRate?: number;
            /**
             * Agency's expense types
             */
            expenseTypes?: {
              reference: number;
              name: string;
              taxRate: number;
            }[];
            /**
             * Agency's rate per kilometer types
             */
            ratePerKilometerTypes?: {
              reference: number;
              name: string;
              amount: number;
            }[];
            expensesLegals?: string;
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
          type: "delivery";
          attributes?: {
            title?: string;
            startDate?: string;
            endDate?: string;
            calendar?: string;
            /**
             * List of expenses details
             */
            expensesDetails?: {
              id: string;
              expenseType: {
                reference: number;
                name: string;
              };
              periodicity: "daily" | "monthly";
              netAmount: number;
              /**
               * Agency on which expenses detail depends
               */
              agency: {
                id: string;
                name: string;
              };
            }[];
          };
        }
      | {
          id: string;
          type: "batch";
          attributes?: {
            title?: string;
          };
        }
      | {
          id: string;
          type: "project";
          attributes?: {
            reference?: string;
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
            /**
             * List of project's deliveries available on this term
             */
            deliveries?: unknown[];
            /**
             * List of project's batches available on this term
             */
            batches?: unknown[];
          };
        }
      | {
          id: string;
          type: "company";
          attributes?: {
            name?: string;
          };
        }
      | {
          id: string;
          type: "validation";
          attributes?: {
            date?: string;
            state?: "waitingForValidation" | "validated" | "rejected";
            reason?: string;
          };
          relationships?: {
            realValidator?:
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
             * Validation's expected validator
             */
            expectedValidator?: {
              data: {
                id: string;
                type: "resource";
              };
            };
          };
        }
      | {
          id: string;
          type: "timesreport";
          attributes?: {
            /**
             * List of regular times
             */
            regularTimes?: {
              id: string;
              startDate: string;
              duration: number;
              /**
               * If it is a new line then row should be inferior or equal to 0
               */
              row: number;
              workUnitType: {
                reference: number;
                activityType:
                  | "production"
                  | "absence"
                  | "internal"
                  | "exceptionalTime"
                  | "exceptionalCalendar";
                name: string;
              };
              calendar?: string;
              delivery:
                | {
                    data: null;
                  }
                | {
                    id: string;
                    title?: string;
                    startDate?: string;
                    endDate?: string;
                  };
              batch:
                | {
                    data: null;
                  }
                | {
                    id: string;
                    title?: string;
                  };
              project:
                | {
                    data: null;
                  }
                | {
                    id: string;
                    reference?: string;
                  };
            }[];
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
          type: "expenseshistory";
          attributes?: {
            updateDate?: string;
            state?: 0 | 1 | 2;
            errorMsg?: string;
          };
        }
      | {
          id: string;
          type: "contract";
          attributes?: {
            startDate?: string;
            endDate?: string;
            calendar?: string;
          };
          relationships?: {
            /**
             * Contract's agency
             */
            agency?: {
              data: {
                id: string;
                type: "agency";
              };
            };
          };
        }
    )[],
  ];
}

/**
 * Empty expenses default basic data
 */
export interface SchemasExpensesReportsDefaultJson {
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
    warnings?: {
      /**
       * Warning's code
       */
      code:
        | "noDeliveryOnProject"
        | "projectDoesNotExist"
        | "deliveryDoesNotExist"
        | "expensesOutsideContractDates"
        | "expensesOutsideDeliveryDates";
      /**
       * Warning's message
       */
      detail: string;
      project:
        | {
            data: null;
          }
        | {
            id: string;
            reference: string;
          };
      delivery:
        | {
            data: null;
          }
        | {
            id: string;
            title: string;
            startDate: string;
            endDate: string;
          };
    }[];
    expectedValidatorsAllowedForValidate?: {
      id: string;
      firstName: string;
      lastName: string;
    }[];
    expectedValidatorsAllowedForUnvalidate?: {
      id: string;
      firstName: string;
      lastName: string;
    }[];
    expectedValidatorsAllowedForReject?: {
      id: string;
      firstName: string;
      lastName: string;
    }[];
    /**
     * true if ai parsing is enabled
     */
    isParsingEnabled?: boolean;
    /**
     * Control help: warning if resource is already invited
     */
    guestsWarning?: {
      /**
       * guestHaveExpense, guestAlreadyGuest or ownerAlreadyGuest
       */
      type: string;
      startDate: string;
      expenseReport: {
        id?: string;
        canRead?: boolean;
        resource?: {
          id?: string;
          fullname?: string;
        };
      };
      expenseType: {
        name?: string;
      };
      guest?: {
        id?: string;
        fullname?: string;
      };
    }[];
  };
  data: {
    id: "0";
    type: "expensesreport";
    attributes?: {
      term?: string;
      ratePerKilometerType?: {
        reference: number;
        name: string;
        amount: number;
      };
      currencyAgency?: number;
      exchangeRateAgency?: number;
      /**
       * List of contractual expenses
       */
      fixedExpenses?: {
        startDate: string;
        /**
         * If it is a new line then row should be inferior or equal to 0
         */
        row: number;
        numberOfKilometers: number;
        /**
         * If kilometer expenses then numberOfKilometers * ratePerKilometerType else cf. database
         */
        amountIncludingTax: number;
        isKilometricExpense: boolean;
        activityType: "production" | "absence" | "internal";
        expenseType:
          | {
              data: null;
            }
          | (null | {
              reference: number;
              taxRate: number;
              name: string;
              guest?: boolean;
              mealDeduction?: boolean;
              position?: number;
            });
      }[];
      /**
       * List of projects expenses
       */
      projectsExpenses?: {
        startDate: string;
        /**
         * If it is a new line then row should be inferior or equal to 0
         */
        row: number;
        numberOfKilometers: number;
        /**
         * If kilometer expenses then numberOfKilometers * ratePerKilometerType else cf. database
         */
        amountIncludingTax: number;
        isKilometricExpense: boolean;
        activityType: "production" | "absence" | "internal";
        expenseType:
          | {
              data: null;
            }
          | (null | {
              reference: number;
              taxRate: number;
              name: string;
              guest?: boolean;
              mealDeduction?: boolean;
              position?: number;
            });
        /**
         * Delivery on which fixed expenses depends
         */
        delivery: {
          id: string;
          title?: string;
          startDate?: string;
          endDate?: string;
        };
        /**
         * Project on which fixed expenses depends
         */
        project: {
          id: string;
          reference?: string;
        };
      }[];
    };
    relationships?: {
      /**
       * Expenses resource
       */
      resource?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Expenses agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
        };
      };
      timesReport?:
        | {
            data: null;
          }
        | {
            id: string;
            type: "timesreport";
          };
      /**
       * List of expenses projects available on this term
       */
      projects?: {
        data: {
          id: string;
          type: "project";
        }[];
      };
      /**
       * Timesheet's expected validators
       */
      validationWorkflow?: {
        data: {
          id: string;
          type: "resource";
        }[];
      };
    };
  };
  /**
   * @minItems 1
   */
  included?: [
    (
      | {
          id: string;
          type: "resource";
          attributes?: {
            firstName?: string;
            lastName?: string;
            function?: string;
          };
        }
      | {
          id: string;
          type: "agency";
          attributes?: {
            name?: string;
            calendar?: string;
            currency?: number;
            exchangeRate?: number;
            /**
             * Agency's expense types
             */
            expenseTypes?: {
              reference: number;
              name: string;
              taxRate: number;
            }[];
            /**
             * Agency's rate per kilometer types
             */
            ratePerKilometerTypes?: {
              reference: number;
              name: string;
              amount: number;
            }[];
          };
        }
      | {
          id: string;
          type: "delivery";
          attributes?: {
            title?: string;
            startDate?: string;
            endDate?: string;
            /**
             * List of expenses details
             */
            expensesDetails?: {
              id: string;
              expenseType: {
                reference: number;
                name: string;
              };
              periodicity: "daily" | "monthly";
              netAmount: number;
              /**
               * Agency on which expenses detail depends
               */
              agency: {
                id: string;
                name: string;
              };
            }[];
          };
        }
      | {
          id: string;
          type: "batch";
          attributes?: {
            title?: string;
          };
        }
      | {
          id: string;
          type: "project";
          attributes?: {
            reference?: string;
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
            /**
             * List of project's deliveries available on this term
             */
            deliveries?: unknown[];
            /**
             * List of project's batches available on this term
             */
            batches?: unknown[];
          };
        }
      | {
          id: string;
          type: "company";
          attributes?: {
            name?: string;
          };
        }
      | {
          id: string;
          type: "timesreport";
          relationships?: {
            /**
             * List of regular times
             */
            regularTimes?: {
              id: string;
              startDate: string;
              duration: number;
              /**
               * If it is a new line then row should be inferior or equal to 0
               */
              row: number;
              workUnitType: {
                reference: number;
                activityType:
                  | "production"
                  | "absence"
                  | "internal"
                  | "exceptionalTime"
                  | "exceptionalCalendar";
                name: string;
              };
              calendar?: string;
              delivery:
                | {
                    data: null;
                  }
                | {
                    id: string;
                    title?: string;
                    startDate?: string;
                    endDate?: string;
                  };
              batch:
                | {
                    data: null;
                  }
                | {
                    id: string;
                    title?: string;
                  };
              project:
                | {
                    data: null;
                  }
                | {
                    id: string;
                    reference?: string;
                  };
            }[];
          };
        }
    ),
    ...(
      | {
          id: string;
          type: "resource";
          attributes?: {
            firstName?: string;
            lastName?: string;
            function?: string;
          };
        }
      | {
          id: string;
          type: "agency";
          attributes?: {
            name?: string;
            calendar?: string;
            currency?: number;
            exchangeRate?: number;
            /**
             * Agency's expense types
             */
            expenseTypes?: {
              reference: number;
              name: string;
              taxRate: number;
            }[];
            /**
             * Agency's rate per kilometer types
             */
            ratePerKilometerTypes?: {
              reference: number;
              name: string;
              amount: number;
            }[];
          };
        }
      | {
          id: string;
          type: "delivery";
          attributes?: {
            title?: string;
            startDate?: string;
            endDate?: string;
            /**
             * List of expenses details
             */
            expensesDetails?: {
              id: string;
              expenseType: {
                reference: number;
                name: string;
              };
              periodicity: "daily" | "monthly";
              netAmount: number;
              /**
               * Agency on which expenses detail depends
               */
              agency: {
                id: string;
                name: string;
              };
            }[];
          };
        }
      | {
          id: string;
          type: "batch";
          attributes?: {
            title?: string;
          };
        }
      | {
          id: string;
          type: "project";
          attributes?: {
            reference?: string;
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
            /**
             * List of project's deliveries available on this term
             */
            deliveries?: unknown[];
            /**
             * List of project's batches available on this term
             */
            batches?: unknown[];
          };
        }
      | {
          id: string;
          type: "company";
          attributes?: {
            name?: string;
          };
        }
      | {
          id: string;
          type: "timesreport";
          relationships?: {
            /**
             * List of regular times
             */
            regularTimes?: {
              id: string;
              startDate: string;
              duration: number;
              /**
               * If it is a new line then row should be inferior or equal to 0
               */
              row: number;
              workUnitType: {
                reference: number;
                activityType:
                  | "production"
                  | "absence"
                  | "internal"
                  | "exceptionalTime"
                  | "exceptionalCalendar";
                name: string;
              };
              calendar?: string;
              delivery:
                | {
                    data: null;
                  }
                | {
                    id: string;
                    title?: string;
                    startDate?: string;
                    endDate?: string;
                  };
              batch:
                | {
                    data: null;
                  }
                | {
                    id: string;
                    title?: string;
                  };
              project:
                | {
                    data: null;
                  }
                | {
                    id: string;
                    reference?: string;
                  };
            }[];
          };
        }
    )[],
  ];
}

/**
 * Expenses rights
 */
export interface SchemasExpensesReportsRightsJson {
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
  };
  data: {
    id: string;
    type: "rights";
    attributes?: {
      actions?: {
        /**
         * true if this action is available
         */
        share?: boolean;
        /**
         * true if this action is available
         */
        seeThreads?: boolean;
        /**
         * true if this action is available
         */
        validate?: boolean;
        /**
         * true if this action is available
         */
        reject?: boolean;
        /**
         * true if this action is available
         */
        unvalidate?: boolean;
        /**
         * true if this action is available
         */
        downloadInternalPDF?: boolean;
        /**
         * true if this action is available
         */
        downloadClientPDF?: boolean;
        /**
         * true if this action is available
         */
        addInvoice?: boolean;
        /**
         * true if this action is available
         */
        exportToDownloadCenter?: boolean;
        /**
         * true if this action is available
         */
        exportCertification?: boolean;
        /**
         * true if this action is available
         */
        deleteValidators?: boolean;
        /**
         * true if this action is available
         */
        pay?: boolean;
        /**
         * true if this action is available
         */
        seeLogs?: boolean;
      };
      apis?: {
        entity?: {
          /**
           * true if the user can read this api
           */
          read: boolean;
          /**
           * true if the user can write this api
           */
          write: boolean;
        };
      };
      attributes?: {
        files?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        certification?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
      };
    };
  };
}

/**
 * Expenses basic data sent in the body with a POST method
 */
export interface SchemasExpensesReportsBodyPostJson {
  data: {
    type: "expensesreport";
    attributes: {
      term: string;
      informationComments?: string;
      ratePerKilometerType?: {
        reference: number;
        amount: number;
      };
      paid?: boolean;
      advance?: number;
      /**
       * List of actual expenses
       */
      actualExpenses?: (
        | {
            startDate: string;
            number: number;
            title: string;
            currency?: number;
            exchangeRate?: number;
            numberOfKilometers?: number;
            /**
             * If kilometer expenses then numberOfKilometers * ratePerKilometerType else cf. database
             */
            amountIncludingTax?: number;
            tax?: number;
            reinvoiced: boolean;
            isKilometricExpense: boolean;
            activityType: "production" | "absence" | "internal";
            expenseType:
              | {
                  data: null;
                }
              | {
                  reference: number;
                };
            delivery:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            batch:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            project:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            guestResources?: {
              id?: string;
              lastName?: string;
              firstName?: string;
              thumbnail?: string;
            }[];
            guestResourcesManual?: string[];
            guestContacts?: {
              id?: string;
              lastName?: string;
              firstName?: string;
              thumbnail?: string;
            }[];
            guestContactsManual?: string[];
            guestCandidates?: {
              id?: string;
              lastName?: string;
              firstName?: string;
              thumbnail?: string;
            }[];
            guestCandidatesManual?: string[];
          }
        | {
            id: string;
            startDate: string;
            number: number;
            title: string;
            currency?: number;
            exchangeRate?: number;
            numberOfKilometers?: number;
            /**
             * If kilometer expenses then numberOfKilometers * ratePerKilometerType else cf. database
             */
            amountIncludingTax?: number;
            tax?: number;
            reinvoiced: boolean;
            isKilometricExpense: boolean;
            activityType: "production" | "absence" | "internal";
            expenseType:
              | {
                  data: null;
                }
              | {
                  reference: number;
                };
            delivery:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            batch:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            project:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            guestResources?: {
              id?: string;
              lastName?: string;
              firstName?: string;
              thumbnail?: string;
            }[];
            guestResourcesManual?: string[];
            guestContacts?: {
              id?: string;
              lastName?: string;
              firstName?: string;
              thumbnail?: string;
            }[];
            guestContactsManual?: string[];
            guestCandidates?: {
              id?: string;
              lastName?: string;
              firstName?: string;
              thumbnail?: string;
            }[];
            guestCandidatesManual?: string[];
          }
      )[];
      /**
       * List of fixed expenses
       */
      fixedExpenses?: (
        | {
            startDate: string;
            row: number;
            numberOfKilometers?: number;
            /**
             * If kilometer expenses then numberOfKilometers * ratePerKilometerType else cf. database
             */
            amountIncludingTax?: number;
            isKilometricExpense: boolean;
            activityType: "production" | "absence" | "internal";
            expenseType:
              | {
                  data: null;
                }
              | {
                  reference: number;
                };
            delivery:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            batch:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            project:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
          }
        | {
            id: string;
            startDate: string;
            row: number;
            numberOfKilometers?: number;
            /**
             * If kilometer expenses then numberOfKilometers * ratePerKilometerType else cf. database
             */
            amountIncludingTax?: number;
            isKilometricExpense: boolean;
            activityType: "production" | "absence" | "internal";
            expenseType:
              | {
                  data: null;
                }
              | {
                  reference: number;
                };
            delivery:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            batch:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            project:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
          }
      )[];
    };
    relationships: {
      /**
       * Expenses resource
       */
      resource: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Expenses agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
        };
      };
    };
  };
}

/**
 * Expenses basic data sent in the body with a PUT method
 */
export interface SchemasExpensesReportsBodyPutJson {
  data: {
    id: string;
    type: "expensesreport";
    attributes?: {
      informationComments?: string;
      ratePerKilometerType?: {
        reference: number;
        amount: number;
      };
      paid?: boolean;
      advance?: number;
      /**
       * List of actual expenses
       */
      actualExpenses?: (
        | {
            startDate: string;
            number: number;
            title: string;
            currency?: number;
            exchangeRate?: number;
            numberOfKilometers?: number;
            /**
             * If kilometer expenses then numberOfKilometers * ratePerKilometerType else cf. database
             */
            amountIncludingTax?: number;
            tax?: number;
            reinvoiced: boolean;
            isKilometricExpense: boolean;
            activityType: "production" | "absence" | "internal";
            expenseType:
              | {
                  data: null;
                }
              | {
                  reference: number;
                };
            delivery:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            batch:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            project:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            guestResources?: {
              id?: string;
              lastName?: string;
              firstName?: string;
              thumbnail?: string;
            }[];
            guestResourcesManual?: string[];
            guestContacts?: {
              id?: string;
              lastName?: string;
              firstName?: string;
              thumbnail?: string;
            }[];
            guestContactsManual?: string[];
            guestCandidates?: {
              id?: string;
              lastName?: string;
              firstName?: string;
              thumbnail?: string;
            }[];
            guestCandidatesManual?: string[];
          }
        | {
            id: string;
            startDate: string;
            number: number;
            title: string;
            currency?: number;
            exchangeRate?: number;
            numberOfKilometers?: number;
            /**
             * If kilometer expenses then numberOfKilometers * ratePerKilometerType else cf. database
             */
            amountIncludingTax?: number;
            tax?: number;
            reinvoiced: boolean;
            isKilometricExpense: boolean;
            activityType: "production" | "absence" | "internal";
            expenseType:
              | {
                  data: null;
                }
              | {
                  reference: number;
                };
            delivery:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            batch:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            project:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            guestResources?: {
              id?: string;
              lastName?: string;
              firstName?: string;
              thumbnail?: string;
            }[];
            guestResourcesManual?: string[];
            guestContacts?: {
              id?: string;
              lastName?: string;
              firstName?: string;
              thumbnail?: string;
            }[];
            guestContactsManual?: string[];
            guestCandidates?: {
              id?: string;
              lastName?: string;
              firstName?: string;
              thumbnail?: string;
            }[];
            guestCandidatesManual?: string[];
          }
      )[];
      /**
       * List of fixed expenses
       */
      fixedExpenses?: (
        | {
            startDate: string;
            row: number;
            numberOfKilometers?: number;
            /**
             * If kilometer expenses then numberOfKilometers * ratePerKilometerType else cf. database
             */
            amountIncludingTax?: number;
            isKilometricExpense: boolean;
            activityType: "production" | "absence" | "internal";
            expenseType:
              | {
                  data: null;
                }
              | {
                  reference: number;
                };
            delivery:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            batch:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            project:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
          }
        | {
            id: string;
            startDate: string;
            row: number;
            numberOfKilometers?: number;
            /**
             * If kilometer expenses then numberOfKilometers * ratePerKilometerType else cf. database
             */
            amountIncludingTax?: number;
            isKilometricExpense: boolean;
            activityType: "production" | "absence" | "internal";
            expenseType:
              | {
                  data: null;
                }
              | {
                  reference: number;
                };
            delivery:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            batch:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            project:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
          }
      )[];
    };
  };
}

/**
 * Expenses validation reject data sent in the body with a POST method
 */
export interface SchemasExpensesReportsRejectPostJson {
  data: {
    /**
     * Resource's `id` on which expenses depends
     */
    expectedValidator: number;
    reason: string;
    rejectTypeOf:
      | "correctionForPreviousValidator"
      | "correctionForAllValidators"
      | "definitiveRefusal";
  };
}

/**
 * Expenses certification data sent in the body with a POST method
 */
export interface SchemasExpensesReportsCertificationPostJson {
  data: {
    type: "expensesreport";
    attributes: {
      term: string;
      informationComments?: string;
      ratePerKilometerType?: {
        reference: number;
        amount: number;
      };
      paid?: boolean;
      advance?: number;
      /**
       * List of actual expenses
       */
      actualExpenses?: (
        | {
            startDate: string;
            number: number;
            title: string;
            currency?: number;
            exchangeRate?: number;
            numberOfKilometers?: number;
            /**
             * If kilometer expenses then numberOfKilometers * ratePerKilometerType else cf. database
             */
            amountIncludingTax?: number;
            tax?: number;
            reinvoiced: boolean;
            isKilometricExpense: boolean;
            activityType: "production" | "absence" | "internal";
            expenseType:
              | {
                  data: null;
                }
              | {
                  reference: number;
                };
            delivery:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            batch:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            project:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            guestResources?: {
              id?: string;
              lastName?: string;
              firstName?: string;
              thumbnail?: string;
            }[];
            guestResourcesManual?: string[];
            guestContacts?: {
              id?: string;
              lastName?: string;
              firstName?: string;
              thumbnail?: string;
            }[];
            guestContactsManual?: string[];
            guestCandidates?: {
              id?: string;
              lastName?: string;
              firstName?: string;
              thumbnail?: string;
            }[];
            guestCandidatesManual?: string[];
          }
        | {
            id: string;
            startDate: string;
            number: number;
            title: string;
            currency?: number;
            exchangeRate?: number;
            numberOfKilometers?: number;
            /**
             * If kilometer expenses then numberOfKilometers * ratePerKilometerType else cf. database
             */
            amountIncludingTax?: number;
            tax?: number;
            reinvoiced: boolean;
            isKilometricExpense: boolean;
            activityType: "production" | "absence" | "internal";
            expenseType:
              | {
                  data: null;
                }
              | {
                  reference: number;
                };
            delivery:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            batch:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            project:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            guestResources?: {
              id?: string;
              lastName?: string;
              firstName?: string;
              thumbnail?: string;
            }[];
            guestResourcesManual?: string[];
            guestContacts?: {
              id?: string;
              lastName?: string;
              firstName?: string;
              thumbnail?: string;
            }[];
            guestContactsManual?: string[];
            guestCandidates?: {
              id?: string;
              lastName?: string;
              firstName?: string;
              thumbnail?: string;
            }[];
            guestCandidatesManual?: string[];
          }
      )[];
      /**
       * List of fixed expenses
       */
      fixedExpenses?: (
        | {
            startDate: string;
            row: number;
            numberOfKilometers?: number;
            /**
             * If kilometer expenses then numberOfKilometers * ratePerKilometerType else cf. database
             */
            amountIncludingTax?: number;
            isKilometricExpense: boolean;
            activityType: "production" | "absence" | "internal";
            expenseType:
              | {
                  data: null;
                }
              | {
                  reference: number;
                };
            delivery:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            batch:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            project:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
          }
        | {
            id: string;
            startDate: string;
            row: number;
            numberOfKilometers?: number;
            /**
             * If kilometer expenses then numberOfKilometers * ratePerKilometerType else cf. database
             */
            amountIncludingTax?: number;
            isKilometricExpense: boolean;
            activityType: "production" | "absence" | "internal";
            expenseType:
              | {
                  data: null;
                }
              | {
                  reference: number;
                };
            delivery:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            batch:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            project:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
          }
      )[];
    };
    relationships: {
      /**
       * Expenses resource
       */
      resource: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Expenses agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
        };
      };
    };
  };
}
