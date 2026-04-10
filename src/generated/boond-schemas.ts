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
            }
          ]
        | [
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            }
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
            }
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
            }
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
            }
          ]
        | [
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            }
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
            }
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
            }
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
            }
          ]
        | [
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            }
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
            }
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
            }
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
        activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
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
              activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
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
        activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
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
            }
          ]
        | [
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            },
            {
              network: "facebook" | "viadeo" | "linkedin" | "x";
              url: string;
            }
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
            }
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
            }
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
          activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
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
          activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
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
              activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
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
            useBeingAcquired?: "inactive" | "allowTakenAbsencesOnBeingAcquired" | "forbidTakenAbsencesOnBeingAcquired";
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
              activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
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
                activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
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
              activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
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
            useBeingAcquired?: "inactive" | "allowTakenAbsencesOnBeingAcquired" | "forbidTakenAbsencesOnBeingAcquired";
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
              activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
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
                activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
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
    )[]
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
            activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
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
          useBeingAcquired?: "inactive" | "allowTakenAbsencesOnBeingAcquired" | "forbidTakenAbsencesOnBeingAcquired";
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
            activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
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
    rejectTypeOf: "correctionForPreviousValidator" | "correctionForAllValidators" | "definitiveRefusal";
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
                activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
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
                activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
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
    )[]
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
                activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
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
                activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
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
    )[]
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
    rejectTypeOf: "correctionForPreviousValidator" | "correctionForAllValidators" | "definitiveRefusal";
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


// ─── billingDetails ───
/**
 * List of billing details
 */
export interface SchemasBillingDetailsSearchJson {
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
    lastBillingDetailAnalysis?:
      | {
          id?: string;
          /**
           * 1: waiting, 2: running, 3: finished, 4: failed
           */
          state?: number;
          creationDate?: string;
          updateDate?: string;
          createdBy?: number;
        }
      | false;
  };
  data: {
    id: string;
    type: "billingdetail";
    attributes?: {
      name?: string;
      contact?: string;
      address1?: string;
      address2?: string;
      address3?: string;
      postcode?: string;
      town?: string;
      country?: string;
      subDivision?: string;
      vatNumber?: string;
      registrationNumber?: string;
      number?: string;
      sendingMode?: number;
      sendingModeParams?: {} | null;
      invalid?: boolean;
      invalidType?: number;
      state?: boolean;
      /**
       * Need to `true` if this item can be read
       */
      canRead?: boolean;
      /**
       * Need to `true` if this item has to be edit
       */
      canEdit?: boolean;
      /**
       * Need to `true` if this item has to be deleted
       */
      canDelete?: boolean;
    };
    relationships?: {
      /**
       * Billing detail's company
       */
      company?: {
        data: {
          id: string;
          type: "company";
        };
      };
    };
  }[];
  included?: {
    id: string;
    type: "company";
    attributes?: {
      name?: string;
      thumbnail?: string;
      state?: number;
    };
  }[];
}

/**
 * Billing detail's data
 */
export interface SchemasBillingDetailsProfileJson {
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
    type: "billingdetail";
    attributes?: {
      name?: string;
      contact?: string;
      phone1?: string;
      emails?: unknown[];
      cc?: unknown[];
      bcc?: unknown[];
      reminderEmails?: unknown[];
      reminderCc?: unknown[];
      reminderBcc?: unknown[];
      address1?: string;
      address2?: string;
      address3?: string;
      postcode?: string;
      town?: string;
      country?: string;
      subDivision?: string;
      vatNumber?: string;
      registrationNumber?: string;
      number?: string;
      sendingMode?: number;
      sendingModeParams?: {} | null;
      invalid?: boolean;
      invalidType?: number;
      state?: boolean;
      /**
       * Need to `true` if this item is used by an order
       */
      isUsed?: boolean;
      /**
       * Need to `true` if this item can be read
       */
      canRead?: boolean;
      /**
       * Need to `true` if this item has to be edit
       */
      canEdit?: boolean;
      /**
       * Need to `true` if this item has to be deleted
       */
      canDelete?: boolean;
    };
    relationships?: {
      /**
       * Billing detail's company
       */
      company?: {
        data: {
          id: string;
          type: "company";
        };
      };
    };
  };
  included?: {
    id: string;
    type: "company";
    attributes?: {
      name?: string;
      thumbnail?: string;
      state?: number;
    };
  }[];
}

/**
 * Billing detail's data
 */
export interface SchemasBillingDetailsInformationJson {
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
    type: "billingdetail";
    attributes?: {
      name?: string;
      contact?: string;
      phone1?: string;
      emails?: unknown[];
      cc?: unknown[];
      bcc?: unknown[];
      reminderEmails?: unknown[];
      reminderCc?: unknown[];
      reminderBcc?: unknown[];
      address1?: string;
      address2?: string;
      address3?: string;
      postcode?: string;
      town?: string;
      country?: string;
      subDivision?: string;
      vatNumber?: string;
      registrationNumber?: string;
      number?: string;
      sendingMode?: number;
      sendingModeParams?: {} | null;
      invalid?: boolean;
      invalidType?: number;
      state?: boolean;
      /**
       * Need to `true` if this item is used by an order
       */
      isUsed?: boolean;
      /**
       * Need to `true` if this item can be read
       */
      canRead?: boolean;
      /**
       * Need to `true` if this item has to be edit
       */
      canEdit?: boolean;
      /**
       * Need to `true` if this item has to be deleted
       */
      canDelete?: boolean;
    };
    relationships?: {
      /**
       * Billing detail's company
       */
      company?: {
        data: {
          id: string;
          type: "company";
        };
      };
    };
  };
  included?: {
    id: string;
    type: "company";
    attributes?: {
      name?: string;
      thumbnail?: string;
      state?: number;
    };
  }[];
}

/**
 * Billing detail's data sent in the body with a POST method
 */
export interface SchemasBillingDetailsBodyPostJson {
  data: {
    type: "billingdetail";
    attributes: {
      name: string;
      contact: string;
      phone1?: string;
      emails?: unknown[];
      cc?: unknown[];
      bcc?: unknown[];
      reminderEmails?: unknown[];
      reminderCc?: unknown[];
      reminderBcc?: unknown[];
      address1?: string;
      address2?: string;
      address3?: string;
      postcode?: string;
      town?: string;
      country?: string;
      subDivision?: string;
      vatNumber: string;
      registrationNumber?: string;
      number?: string;
      sendingMode?: number;
      sendingModeParams?: {} | null;
      state: boolean;
    };
    relationships: {
      /**
       * Billing detail's company
       */
      company: {
        data: {
          id: string;
          type: "company";
        };
      };
    };
  };
}

/**
 * Billing detail's data sent in the body with a PUT method
 */
export interface SchemasBillingDetailsBodyPutJson {
  data: {
    type: "billingdetail";
    attributes: {
      name: string;
      contact: string;
      phone1?: string;
      emails?: unknown[];
      cc?: unknown[];
      bcc?: unknown[];
      reminderEmails?: unknown[];
      reminderCc?: unknown[];
      reminderBcc?: unknown[];
      address1?: string;
      address2?: string;
      address3?: string;
      postcode?: string;
      town?: string;
      country?: string;
      subDivision?: string;
      vatNumber: string;
      registrationNumber?: string;
      number?: string;
      sendingMode?: number;
      sendingModeParams?: {} | null;
      state: boolean;
    };
  };
}


// ─── timesReports ───
/**
 * List of timesheets
 */
export interface SchemasTimesReportsSearchJson {
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
    type: "timesreport";
    attributes?: {
      term?: string;
      state?: "savedAndNoValidation" | "waitingForValidation" | "validated" | "rejected";
      closed?: boolean;
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
 * Timesheet's basic data
 */
export interface SchemasTimesReportsProfileJson {
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
        | "moreThanNumberOfWorkingDays"
        | "workplaceTimesMoreThanNumberOfWorkingDays"
        | "workplaceTimesLessThanNumberOfWorkingDays"
        | "atLeastOneAbsenceQuotaExceeded"
        | "wrongAbsences"
        | "wrongMandatoryLeaves"
        | "noDeliveryOnProject"
        | "projectDoesNotExist"
        | "deliveryDoesNotExist"
        | "outsideContractDates"
        | "outsideDeliveryDates"
        | "outsideDocumentDates"
        | "lessThanNumberOfWorkingDaysInsideContractDates"
        | "moreThanNumberOfWorkingDaysInsideContractDates"
        | "noSignedTimesheet"
        | "workUnitRatesNotEqual";
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
            calendar?: string;
          };
      workUnitType:
        | {
            data: null;
          }
        | {
            reference: number;
            name: string;
          };
      projects?: {
        id: string;
        reference: string;
        mailValidatorSignature?: string;
      }[];
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
    type: "timesreport";
    attributes?: {
      creationDate?: string;
      updateDate?: string;
      term?: string;
      workUnitRate?: number;
      informationComments?: string;
      closed?: boolean;
      state?: "savedAndNoValidation" | "waitingForValidation" | "validated" | "rejected";
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
          activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
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
      /**
       * List of exceptional times
       */
      exceptionalTimes?: {
        id: string;
        startDate: string;
        endDate: string;
        duration: number;
        recovering: boolean;
        description: string;
        workUnitType: {
          reference: number;
          activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
          name: string;
        };
        /**
         * Delivery on which exceptional time depends
         */
        delivery: {
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
        /**
         * Project on which exceptional time depends
         */
        project: {
          id: string;
          reference?: string;
        };
      }[];
      /**
       * List of absences times
       */
      absencesTimes?: {
        startDate: string;
        duration: number;
        workUnitType: {
          reference: number;
          activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
          name: string;
        };
      }[];
      /**
       * List of planned times
       */
      plannedTimes?: {
        id?: string;
        startDate: string;
        duration: number;
        /**
         * If it is a new line then row should be inferior or equal to 0
         */
        row: number;
        workUnitType: {
          reference: number;
          activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
          name: string;
        };
        delivery:
          | {
              data: null;
            }
          | {
              id: string;
              title?: string;
              startDate?: string;
              endDate?: string;
              calendar?: string;
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
       * List of workplace times
       */
      workplaceTimes?: {
        id: string;
        startDate: string;
        duration: number;
        /**
         * If it is a new line then row should be inferior or equal to 0
         */
        row: number;
        workplaceType: {
          reference: number;
          name: string;
        };
      }[];
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
       * Timesheet's agency
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
      expensesReport?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "expensesreport";
            };
          };
      /**
       * List of timesheet's orders available on this term
       */
      orders?: {
        data: {
          id: string;
          type: "order";
        }[];
      };
      /**
       * List of timesheet's projects available on this term
       */
      projects?: {
        data: {
          id: string;
          type: "project";
          mailValidatorSignature?: string;
        }[];
      };
      /**
       * List of timesheet's validations
       */
      validations?: {
        data: {
          id: string;
          type: "validation";
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
      /**
       * The signatures related to the timesheet
       */
      signatures?: {
        data: {
          id: string;
          type: "signature";
        }[];
      };
    };
  };
  included?: (
    | {
        id: string;
        type: "signature";
        attributes?: {
          state?: "pending" | "validated";
          creationDate?: string;
          remindDate?: string;
          date?: string;
          lastName?: string;
          firstName?: string;
          function?: string;
          token?: string;
          mailValidatorSignature?: string;
        };
        relationships?: {
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
          remindedBy?:
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
      }
    | {
        id: string;
        type: "resource";
        attributes?: {
          firstName?: string;
          lastName?: string;
          function?: string;
          allowExceptionalTimes?: -1 | 0 | 1;
          canRecoverExceptionalTimes?: boolean;
          workUnitTypesAllowed?: {
            reference: number;
            name: string;
            activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
          }[];
          workUnitRate?: "notUsed" | number;
          workplacesDefaultWeek?: {
            reference?: number;
            /**
             * Day of week for workplace time setting
             */
            dayOfWeek: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
            /**
             * Duration for the workplace times settings
             */
            duration: number;
          }[];
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
          workUnitRate?: "notUsed" | number;
          calendar?: string;
          /**
           * Agency's workplaceTypes
           */
          workplaceTypes?: {
            reference: number;
            name: string;
          }[];
          timesLegals?: string;
          timesAlerts?:
            | []
            | [
                {
                  alert:
                    | "moreThanNumberOfWorkingDays"
                    | "workplaceTimesMoreThanNumberOfWorkingDays"
                    | "workplaceTimesLessThanNumberOfWorkingDays"
                    | "atLeastOneAbsenceQuotaExceeded"
                    | "wrongAbsences"
                    | "outsideContractDates"
                    | "lessThanNumberOfWorkingDaysInsideContractDates"
                    | "moreThanNumberOfWorkingDaysInsideContractDates";
                  blocking: boolean;
                }
              ];
        };
      }
    | {
        id: string;
        type: "document";
        attributes?: {
          name: string;
          category: string;
        };
        relationships?: {
          /**
           * The project related to the document
           */
          project?: {
            data: {
              id: string;
              type: "project";
            };
          };
          /**
           * The signature related to the file
           */
          signature?: {
            data: {
              id: string;
              type: "signature";
            };
          };
        };
      }
    | {
        id: string;
        type: "delivery";
        attributes?: {
          title?: string;
          startDate?: string;
          endDate?: string;
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
          mailValidatorSignature?: string;
          /**
           * true if the project's order monitor signed timesheets
           */
          isMonitorSignedTimesheets?: boolean;
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
          deliveries?: {
            data: {
              id: string;
              type: "delivery";
            }[];
          };
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
  )[];
}

/**
 * Empty timesheet's default basic data
 */
export interface SchemasTimesReportsDefaultJson {
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
        | "moreThanNumberOfWorkingDays"
        | "workplaceTimesMoreThanNumberOfWorkingDays"
        | "workplaceTimesLessThanNumberOfWorkingDays"
        | "atLeastOneAbsenceQuotaExceeded"
        | "wrongAbsences"
        | "wrongMandatoryLeaves"
        | "noDeliveryOnProject"
        | "projectDoesNotExist"
        | "deliveryDoesNotExist"
        | "outsideContractDates"
        | "outsideDeliveryDates"
        | "outsideDocumentDates"
        | "lessThanNumberOfWorkingDaysInsideContractDates"
        | "moreThanNumberOfWorkingDaysInsideContractDates"
        | "noSignedTimesheet"
        | "workUnitRatesNotEqual";
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
      workUnitType:
        | {
            data: null;
          }
        | {
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
    type: "timesreport";
    attributes?: {
      term?: string;
      workUnitRate?: number;
      /**
       * List of absences times
       */
      absencesTimes?: {
        startDate: string;
        duration: number;
        workUnitType: {
          reference: number;
          activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
          name: string;
        };
      }[];
      /**
       * List of planned times
       */
      plannedTimes?: {
        id?: string;
        startDate: string;
        duration: number;
        /**
         * If it is a new line then row should be inferior or equal to 0
         */
        row: number;
        workUnitType: {
          reference: number;
          activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
          name: string;
        };
        delivery:
          | {
              data: null;
            }
          | {
              id: string;
              title?: string;
              startDate?: string;
              endDate?: string;
              calendar?: string;
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
       * List of workplace times
       */
      workplaceTimes?: {
        id: string;
        startDate: string;
        duration: number;
        /**
         * If it is a new line then row should be inferior or equal to 0
         */
        row: number;
        workplaceType: {
          reference: number;
          name: string;
        };
      }[];
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
      expensesReport?:
        | {
            data: null;
          }
        | {
            id: string;
            type: "expensesreport";
          };
      /**
       * List of timesheet's projects available on this term
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
  included?: (
    | {
        id: string;
        type: "resource";
        attributes?: {
          firstName?: string;
          lastName?: string;
          function?: string;
          allowExceptionalTimes?: -1 | 0 | 1;
          canRecoverExceptionalTimes?: boolean;
          workUnitTypesAllowed?: {
            reference: number;
            name: string;
            activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
          }[];
          workUnitRate?: "notUsed" | number;
          workplacesDefaultWeek?: {
            reference?: number;
            /**
             * Day of week for workplace time setting
             */
            dayOfWeek: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
            /**
             * Duration for the workplace times settings
             */
            duration: number;
          }[];
        };
      }
    | {
        id: string;
        type: "agency";
        attributes?: {
          name?: string;
          workUnitRate?: "notUsed" | number;
          calendar?: string;
          timesLegals?: string;
          timesAlerts?:
            | []
            | [
                {
                  alert:
                    | "moreThanNumberOfWorkingDays"
                    | "workplaceTimesMoreThanNumberOfWorkingDays"
                    | "workplaceTimesLessThanNumberOfWorkingDays"
                    | "atLeastOneAbsenceQuotaExceeded"
                    | "wrongAbsences"
                    | "outsideContractDates"
                    | "lessThanNumberOfWorkingDaysInsideContractDates"
                    | "moreThanNumberOfWorkingDaysInsideContractDates";
                  blocking: boolean;
                }
              ];
        };
      }
    | {
        id: string;
        type: "delivery";
        attributes?: {
          title?: string;
          startDate?: string;
          endDate?: string;
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
  )[];
}

/**
 * Timesheet's rights
 */
export interface SchemasTimesReportsRightsJson {
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
        deleteValidators?: boolean;
        /**
         * true if this action is available
         */
        seeLogs?: boolean;
        /**
         * true if this action is available
         */
        setWorkplacesDefaultWeek?: boolean;
        /**
         * true if this action is available
         */
        signature?: boolean;
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
        workplaceTimes?: {
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
 * Timesheet's basic data sent in the body with a POST method
 */
export interface SchemasTimesReportsBodyPostJson {
  data: {
    type: "timesreport";
    attributes: {
      term: string;
      workUnitRate?: number;
      informationComments?: string;
      /**
       * List of regular times
       */
      regularTimes?: (
        | {
            startDate: string;
            duration: number;
            row: number;
            workUnitType: {
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
            duration: number;
            row: number;
            workUnitType: {
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
      /**
       * List of exceptional times
       */
      exceptionalTimes?: (
        | {
            startDate: string;
            endDate: string;
            recovering?: boolean;
            description: string;
            workUnitType: {
              reference: number;
            };
            /**
             * Delivery on which exceptional time depends
             */
            delivery: {
              id: string;
            };
            batch:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            /**
             * Project on which exceptional time depends
             */
            project: {
              id: string;
            };
          }
        | {
            id: string;
            startDate: string;
            endDate: string;
            recovering?: boolean;
            description: string;
            workUnitType: {
              reference: number;
            };
            /**
             * Delivery on which exceptional time depends
             */
            delivery: {
              id: string;
            };
            batch:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            /**
             * Project on which exceptional time depends
             */
            project: {
              id: string;
            };
          }
      )[];
      /**
       * List of workplace times
       */
      workplaceTimes?: {
        id: string;
        startDate: string;
        duration: number;
        /**
         * If it is a new line then row should be inferior or equal to 0
         */
        row: number;
        workplaceType: {
          reference: number;
          name: string;
        };
      }[];
    };
    relationships: {
      /**
       * Timesheet's resource
       */
      resource: {
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
  };
}

/**
 * Timesheet's basic data sent in the body with a PUT method
 */
export interface SchemasTimesReportsBodyPutJson {
  data: {
    id: string;
    type: "timesreport";
    attributes?: {
      workUnitRate?: number;
      informationComments?: string;
      /**
       * List of regular times
       */
      regularTimes?: (
        | {
            startDate: string;
            duration: number;
            row: number;
            workUnitType: {
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
            duration: number;
            row: number;
            workUnitType: {
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
      /**
       * List of exceptional times
       */
      exceptionalTimes?: (
        | {
            startDate: string;
            endDate: string;
            recovering?: boolean;
            description: string;
            workUnitType: {
              reference: number;
            };
            /**
             * Delivery on which exceptional time depends
             */
            delivery: {
              id: string;
            };
            batch:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            /**
             * Project on which exceptional time depends
             */
            project: {
              id: string;
            };
          }
        | {
            id: string;
            startDate: string;
            endDate: string;
            recovering?: boolean;
            description: string;
            workUnitType: {
              reference: number;
            };
            /**
             * Delivery on which exceptional time depends
             */
            delivery: {
              id: string;
            };
            batch:
              | {
                  data: null;
                }
              | {
                  id: string;
                };
            /**
             * Project on which exceptional time depends
             */
            project: {
              id: string;
            };
          }
      )[];
      /**
       * List of workplace times
       */
      workplaceTimes?: {
        id: string;
        startDate: string;
        duration: number;
        /**
         * If it is a new line then row should be inferior or equal to 0
         */
        row: number;
        workplaceType: {
          reference: number;
          name: string;
        };
      }[];
    };
  };
}

/**
 * Timesheet's validation reject data sent in the body with a POST method
 */
export interface SchemasTimesReportsRejectPostJson {
  data: {
    /**
     * Resource's `id` on which timesheet depends
     */
    expectedValidator: number;
    reason: string;
    rejectTypeOf: "correctionForPreviousValidator" | "correctionForAllValidators" | "definitiveRefusal";
  };
}

/**
 * Timesheet's signature data sent in the body with a POST method
 */
export interface SchemasTimesReportsSignatureBodyPostJson {
  data: {
    /**
     * Project's `id` on which signature depends
     */
    project?: number;
    /**
     * Type of formatted file (imported or customer)
     */
    type?: string;
    /**
     * File's `id` on which signature depends
     */
    attachment?: string;
    workUnitTypes?: string[];
    /**
     * Available only if **type** is `customer`
     */
    showWorkUnitTypeName?: boolean;
    /**
     * Available only if **type** is `customer`
     */
    useWorkUnitsForRegularDurations?: boolean;
    /**
     * Available only if **type** is `customer`
     */
    showResourceFullName?: boolean;
    /**
     * Available only if **type** is `customer`
     */
    showInformationComments?: boolean;
    /**
     * Email's of validator
     */
    mailValidatorSignature?: string;
  };
}


// ─── providerInvoices ───
/**
 * List of provider invoices
 */
export interface SchemasProviderInvoicesSearchJson {
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
      amountIncludingTax?: number;
    };
  };
  data: {
    id: string;
    type: "providerinvoice";
    attributes?: {
      creationDate?: string;
      invoiceDate?: string;
      paidDate?: string;
      reference?: string;
      state?: number;
      stateReason?: {
        typeOf?: number;
        detail?: string;
      };
      currency?: number;
      currencyAgency?: number;
      dueDate?: string;
      amountExcludingTax?: number;
      amountIncludingTax?: number;
      exchangeRate?: number;
      exchangeRateAgency?: number;
      /**
       * Payments state
       */
      paymentState?: 0 | 1 | 2;
      canReadProviderInvoice?: boolean;
      source?: number;
      vatNumber?: string;
      isCreditNote?: boolean;
    };
    relationships?: {
      /**
       * Provider invoice's main manager
       */
      mainManager?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Provider invoice's resource
       */
      resource?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Provider invoice's agency
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
      document?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "providerinvoicedocument";
            };
          };
      providerContact?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "contact";
            };
          };
      providerCompany?:
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
          typeOf?: number;
          /**
           * If false then resource is not accessible
           */
          canReadResource?: boolean;
        };
      }
    | {
        id: string;
        type: "providerinvoicedocument";
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
        };
      }
    | {
        id: string;
        type: "company";
        attributes?: {
          name?: string;
        };
      }
  )[];
}

/**
 * Provider invoice's basic data
 */
export interface SchemasProviderInvoicesProfileJson {
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
    /**
     * true if ai parsing is enabled
     */
    isParsingEnabled?: boolean;
  };
  data: {
    id: string;
    type: "providerinvoice";
    attributes?: {
      reference?: string;
      state?: number;
      /**
       * Payments state
       */
      paymentState?: 0 | 1 | 2;
      stateReason?: {
        typeOf?: number;
        detail?: string;
      };
      creationDate?: string;
      invoiceDate?: string;
      startDate?: string;
      updateDate?: string;
      endDate?: string;
      paidDate?: string;
      exchangeRate?: number;
      exchangeRateAgency?: number;
      currency?: number;
      currencyAgency?: number;
      amountExcludingTax?: number;
      amountIncludingTax?: number;
      payments?: {
        id: string;
        state: number;
        number: string;
        expectedDate: string;
        amountExcludingTax: number;
        /**
         * If false then payment is not accessible
         */
        canReadPayment: boolean;
        purchase: {
          id: string;
          title: string;
          reference: string;
          currency: number;
          currencyAgency: number;
          exchangeRate: number;
          exchangeRateAgency: number;
          project: {
            id: string;
            reference: string;
          };
          delivery: {
            id: string;
            title: string;
          };
        };
      }[];
      vatNumber?: string;
      source?: number;
      dueDate?: string;
      isCreditNote?: boolean;
      /**
       * Does provider invoice have additional attachments
       */
      hasAttachment?: boolean;
    };
    relationships?: {
      /**
       * Provider invoice's resource
       */
      resource?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Provider invoice's creator
       */
      createdBy?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Provider invoice's mainManager
       */
      mainManager?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Provider invoice's agency
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
      document?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "providerinvoicedocument";
            };
          };
      providerCompany?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "company";
            };
          };
      providerContact?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "contact";
            };
          };
      billingDetail?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "billingdetail";
            };
          };
      /**
       * Provider invoice's attachments
       */
      files?: {
        data: {
          id: string;
          type: "providerinvoicedocument";
        }[];
      };
    };
  };
  included?: (
    | {
        id: string;
        type: "resource";
        attributes?: {
          lastName?: string;
          firstName?: string;
          typeOf?: number;
        };
        relationships?: {
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
        type: "resource";
        attributes?: {
          lastName?: string;
          firstName?: string;
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
        type: "agency";
        attributes?: {
          name?: string;
        };
      }
    | {
        id: string;
        type: "providerinvoicedocument";
        attributes?: {
          name?: string;
        };
      }
    | {
        id: string;
        type: "providerinvoicedocument";
        attributes?: {
          name: string;
        };
      }
    | {
        id: string;
        type: "company";
        attributes?: {
          name?: string;
          vatNumber?: string;
          /**
           * List of billing details (simplified for provider invoice)
           */
          billingDetails?: {
            id: string;
            name: string;
            contact: string;
            phone1: string;
            emails: unknown[];
            address1: string;
            address2: string;
            address3: string;
            postcode: string;
            town: string;
            country: string;
            state: boolean;
          }[];
        };
      }
    | {
        id: string;
        type: "contact";
        attributes?: {
          lastName?: string;
          firstName?: string;
        };
      }
  )[];
}

/**
 * Empty provider invoice's basic data
 */
export interface SchemasProviderInvoicesDefaultJson {
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
    /**
     * true if ai parsing is enabled
     */
    isParsingEnabled?: boolean;
  };
  data: {
    id: "0";
    type: "providerinvoice";
    attributes?: {
      reference?: string;
      state?: number;
      /**
       * Payments state
       */
      paymentState?: 0 | 1 | 2;
      invoiceDate?: string;
      startDate?: string;
      endDate?: string;
      exchangeRate?: number;
      exchangeRateAgency?: number;
      currency?: number;
      currencyAgency?: number;
      amountExcludingTax?: number;
      amountIncludingTax?: number;
    };
    relationships?: {
      /**
       * Provider invoice's resource
       */
      resource?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Provider invoice's mainManager
       */
      mainManager?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Provider invoice's agency
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
  };
  included?: (
    | {
        id: string;
        type: "resource";
        attributes?: {
          lastName?: string;
          firstName?: string;
          typeOf?: number;
        };
      }
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
        type: "pole";
        attributes?: {
          name?: string;
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
 * Provider invoices rights
 */
export interface SchemasProviderInvoicesRightsJson {
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
      actions?:
        | {
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
            seeLogs?: boolean;
            /**
             * true if this action is available
             */
            seePayments?: boolean;
            /**
             * true if this action is available
             */
            addPayment?: boolean;
          }
        | {
            /**
             * true if this action is available
             *
             * This interface was referenced by `undefined`'s JSON-Schema definition
             * via the `patternProperty` "APP[0-9]+".
             */
            [k: string]: boolean;
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
        document?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        mainManager?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        pole?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        agency?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        resource?: {
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
 * Provider invoices activity expenses
 */
export interface SchemasProviderInvoicesActivityExpensesJson {
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
    totalAmountExcludingTax?: number;
  };
  data: {
    id?: string;
    type?: "activityexpense";
    attributes?: {
      typeOf: "time_regular" | "time_exceptionalTime" | "time_exceptionalCalendar" | "expense";
      quantity: number;
      quantityUnit: "days" | "hours";
      amountExcludingTax: number;
      totalAmountExcludingTax: number;
    };
    relationships?: {
      project?: {
        data?: {
          id?: string;
          type?: "project";
        };
      };
      delivery?: {
        data?: {
          id?: string;
          type?: "delivery";
        };
      };
    };
  }[];
  included?: (
    | {
        id?: string;
        type?: "project";
        attributes?: {
          reference?: string;
        };
      }
    | {
        id?: string;
        type?: "delivery";
        attributes?: {
          title?: string;
        };
        relationships?: {
          /**
           * Purchase on which delivery or slave depends
           */
          purchase?: {
            data: {
              id: string;
              type: "purchase";
            };
          };
          slave?: {
            data?: {
              id?: string;
              type?: "delivery";
            };
          };
        };
        additionalProperties?: never;
      }
  )[];
}

/**
 * Provider Invoices's information data sent in the body with a POST method
 */
export interface SchemasProviderInvoicesBodyPostJson {
  data: {
    type: "providerinvoice";
    attributes?: {
      invoiceDate?: string;
      reference?: string;
      state?: number;
      stateReason?: {
        typeOf?: number;
        detail?: string;
      };
      startDate?: string;
      endDate?: string;
      currency?: number;
      exchangeRate?: number;
      currencyAgency?: number;
      exchangeRateAgency?: number;
      amountIncludingTax?: number;
      amountExcludingTax?: number;
      /**
       * Temporary file ID to attach to provider invoice on create
       */
      tmpFile?: string;
      payments?: {
        state: number;
        amountExcludingTax: number;
        deliveryId: string;
      }[];
    };
    relationships?: {
      /**
       * Provider Invoices's main manager
       */
      mainManager?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Provider Invoices's agency
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
       * Provider invoice's resource
       */
      resource?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      providerCompany?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "company";
            };
          };
      providerContact?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "contact";
            };
          };
      billingDetail?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "billingdetail";
            };
          };
    };
  };
}

/**
 * Provider Invoices's information data sent in the body with a PUT method
 */
export interface SchemasProviderInvoicesBodyPutJson {
  data: {
    type: "providerinvoice";
    attributes?: {
      creationDate?: string;
      invoiceDate?: string;
      reference?: string;
      state?: number;
      stateReason?: {
        typeOf?: number;
        detail?: string;
      };
      startDate?: string;
      endDate?: string;
      currency?: number;
      exchangeRate?: number;
      currencyAgency?: number;
      exchangeRateAgency?: number;
      amountIncludingTax?: number;
      amountExcludingTax?: number;
      payments?: {
        state: number;
        amountExcludingTax: number;
        /**
         * amountExcludingTax * (1 + taxRate / 100)
         */
        amountIncludingTax?: number;
        taxRate?: number;
        deliveryId: string;
      }[];
    };
    relationships?: {
      /**
       * Provider Invoices's main manager
       */
      mainManager?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Provider Invoices's agency
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
      providerCompany?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "company";
            };
          };
      providerContact?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "contact";
            };
          };
      billingDetail?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "billingdetail";
            };
          };
    };
  };
}


// ─── webhooks ───
/**
 * List of webhooks
 */
export interface SchemasWebhooksSearchJson {
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
    type: "webhook";
    attributes?: {
      name?: string;
      description?: string;
      url?: string;
      /**
       * List of events
       */
      events?: {
        type?: "create" | "update" | "delete";
        entity?:
          | (
              | "product"
              | "candidate"
              | "resource"
              | "advantage"
              | "contract"
              | "purchase"
              | "payment"
              | "opportunity"
              | "app"
              | "positioning"
              | "order"
              | "invoice"
              | "contact"
              | "company"
              | "project"
              | "delivery"
              | "inactivity"
              | "groupment"
              | "businessunit"
              | "agency"
              | "pole"
              | "role"
              | "expensesreport"
              | "timesreport"
              | "absencesreport"
              | "action"
              | "quotation"
              | "validation"
              | "vendor"
              | "customer"
              | "architecture"
              | "savedsearch"
              | "actiontemplate"
              | "flag"
              | "target"
              | "thread"
              | "roletemplate"
              | "todolist"
              | "task"
            )
          | string;
      }[];
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
    };
  }[];
}

/**
 * Webhook's basic data
 */
export interface SchemasWebhooksProfileJson {
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
    type: "webhook";
    attributes?: {
      name?: string;
      description?: string;
      url?: string;
      /**
       * List of events
       */
      events?: {
        type?: "create" | "update" | "delete";
        entity?:
          | (
              | "product"
              | "candidate"
              | "resource"
              | "advantage"
              | "contract"
              | "purchase"
              | "payment"
              | "opportunity"
              | "app"
              | "positioning"
              | "order"
              | "invoice"
              | "contact"
              | "company"
              | "project"
              | "delivery"
              | "inactivity"
              | "groupment"
              | "businessunit"
              | "agency"
              | "pole"
              | "role"
              | "expensesreport"
              | "timesreport"
              | "absencesreport"
              | "action"
              | "quotation"
              | "validation"
              | "vendor"
              | "customer"
              | "architecture"
              | "savedsearch"
              | "actiontemplate"
              | "flag"
              | "target"
              | "thread"
              | "roletemplate"
              | "todolist"
              | "task"
            )
          | string;
      }[];
    };
    relationships?: {
      /**
       * Webhook's resource
       */
      createdBy?: {
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
 * Webhook's post data
 */
export interface SchemasWebhooksBodyPostJson {
  data: {
    id?: string;
    type: "webhook";
    attributes?: {
      name?: string;
      description?: string;
      url?: string;
      /**
       * List of events
       */
      events?: {
        type?: "create" | "update" | "delete";
        entity?:
          | (
              | "product"
              | "candidate"
              | "resource"
              | "advantage"
              | "contract"
              | "purchase"
              | "payment"
              | "opportunity"
              | "app"
              | "positioning"
              | "order"
              | "invoice"
              | "contact"
              | "company"
              | "project"
              | "delivery"
              | "inactivity"
              | "groupment"
              | "businessunit"
              | "agency"
              | "pole"
              | "role"
              | "expensesreport"
              | "timesreport"
              | "absencesreport"
              | "action"
              | "quotation"
              | "validation"
              | "vendor"
              | "customer"
              | "architecture"
              | "savedsearch"
              | "actiontemplate"
              | "flag"
              | "target"
              | "thread"
              | "roletemplate"
              | "todolist"
              | "task"
            )
          | string;
      }[];
    };
    relationships?: {
      /**
       * Webhook's resource
       */
      createdBy?: {
        data: {
          id: string;
          type: "resource";
        };
      };
    };
  };
}

/**
 * Webhooks basic data sent in the body with a PUT method
 */
export interface SchemasWebhooksBodyPutJson {
  data: {
    id?: string;
    type: "webhook";
    attributes?: {
      name?: string;
      description?: string;
      url?: string;
      /**
       * List of events
       */
      events?: {
        type?: "create" | "update" | "delete";
        entity?:
          | (
              | "product"
              | "candidate"
              | "resource"
              | "advantage"
              | "contract"
              | "purchase"
              | "payment"
              | "opportunity"
              | "app"
              | "positioning"
              | "order"
              | "invoice"
              | "contact"
              | "company"
              | "project"
              | "delivery"
              | "inactivity"
              | "groupment"
              | "businessunit"
              | "agency"
              | "pole"
              | "role"
              | "expensesreport"
              | "timesreport"
              | "absencesreport"
              | "action"
              | "quotation"
              | "validation"
              | "vendor"
              | "customer"
              | "architecture"
              | "savedsearch"
              | "actiontemplate"
              | "flag"
              | "target"
              | "thread"
              | "roletemplate"
              | "todolist"
              | "task"
            )
          | string;
      }[];
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
    };
  };
}


// ─── deliveries ───
/**
 * Delivery's basic data
 */
export interface SchemasDeliveriesProfileJson {
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
    type: "delivery";
    attributes?: {
      startDate?: string;
      endDate?: string;
      title?: string;
      typeOf?: number;
      state?: number;
      /**
       * If false then contract information is not accessible for delivery
       */
      canShowAverageDailyContractCost?: boolean;
      /**
       * Can not be set if delivery depends on a `groupment` and `forceAverageDailyPriceExcludingTax` is false
       */
      averageDailyPriceExcludingTax?: number;
      forceAverageDailyPriceExcludingTax?: boolean;
      subscriptionQuantityCharged?: number;
      subscriptionQuantityFree?: number;
      subscriptionPriceExcludingTax?: number;
      averageDailyCost?: number;
      averageDailyContractCost?: number;
      numberOfDaysInvoicedOrQuantity?: number;
      numberOfDaysFree?: number;
      informationComments?: string;
      conditions?: string;
      /**
       * Sum of all turnover on delivery & additional data excluding tax
       */
      turnoverSimulatedExcludingTax?: number;
      /**
       * Sum of all costs on delivery & additional data excluding tax
       */
      costsSimulatedExcludingTax?: number;
      /**
       * turnoverSimulatedExcludingTax - costsSimulatedExcludingTax
       */
      marginSimulatedExcludingTax?: number;
      /**
       * 100 * marginSimulatedExcludingTax / turnoverSimulatedExcludingTax
       */
      profitabilitySimulated?: number;
      /**
       * (numberOfDaysInvoicedOrQuantity +  numberOfDaysFree) / number of working days or periods between startDate and endDate, only available if delivery is not a `groupment` and project's type is not `product`
       */
      occupationRate?: number;
      dailyExpenses?: number;
      monthlyExpenses?: number;
      numberOfWorkingDays?: number;
      weeklyWorkingHours?: number;
      averageHourlyPriceExcludingTax?: number;
      forceAverageHourlyPriceExcludingTax?: boolean;
      /**
       * Delivery's additional turnover and costs
       */
      additionalTurnoverAndCosts?: {
        id: string;
        date: string;
        state: boolean;
        /**
         * True if user can write on additional turnover and costs
         */
        canWriteAdditionalTurnoverAndCosts?: boolean;
        title: string;
        turnoverExcludingTax: number;
        costsExcludingTax: number;
        typeOf: number;
        purchase:
          | {
              data: null;
            }
          | {
              id: string;
              title?: string;
              subscription: number;
            };
      }[];
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
      /**
       * List of advantages
       */
      advantageTypes?: {
        reference: number;
        name: string;
        frequency: "punctual" | "daily" | "monthly" | "quarterly" | "semiAnnual" | "annual";
        category: "fixedAmount" | "variableSalaryBasis" | "package" | "loan";
        participationQuota: number;
        agencyQuota: number;
        employeeQuota: number;
        /**
         * Agency on which advantage type depends
         */
        agency: {
          id: string;
          name: string;
        };
      }[];
      /**
       * List of exceptional scales
       */
      exceptionalScales?: {
        reference: number;
        name: string;
        workUnitTypes: {
          reference: number;
          name: string;
          activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
        }[];
        exceptionalRules: {
          reference: number;
          name: string;
          priceExcludingTaxOrPriceRate: null | number;
          grossCostOrSalaryRate: null | number;
        }[];
        dependsOn:
          | {
              id: string;
              type: "agency";
              name: string;
              currency: number;
              exchangeRate: number;
              /**
               * Agency's exceptional scales types
               *
               * @minItems 1
               * @maxItems 1
               */
              exceptionScales?: [
                {
                  reference: number;
                  exceptionalRules?: {
                    reference: number;
                    name: string;
                    priceExcludingTaxOrPriceRate: number;
                    grossCostOrSalaryRate: number;
                  }[];
                }
              ];
            }
          | {
              id: string;
              type: "company";
              name: string;
              /**
               * @minItems 1
               * @maxItems 1
               */
              exceptionScales?: [
                {
                  reference: number;
                  exceptionalRules: {
                    reference: number;
                    name: string;
                    priceExcludingTaxOrPriceRate: number;
                    grossCostOrSalaryRate: number;
                  }[];
                }
              ];
            };
        /**
         * Agency on which exceptional type depends
         */
        agency?: {
          id: string;
          name: string;
          currency: number;
          exchangeRate: number;
          /**
           * Agency's work unit types
           */
          workUnitTypes: {
            reference: number;
            activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
            name: string;
            allowAccessLevel: {
              [k: string]: unknown;
            };
            resourcesTypes: string[];
            state: boolean;
          }[];
        };
      }[];
      creationDate?: string;
      updateDate?: string;
      calendar?: string;
    };
    relationships?: {
      /**
       * Delivery's project
       */
      project?: {
        data: {
          id: string;
          type: "project";
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
              type: "product";
            };
          }
        | {
            data: {
              id: string;
              type: "standardprofile";
            };
          };
      contract?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "contract";
            };
          };
      purchase?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "purchase";
            };
          };
      groupment?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "groupment";
            };
          };
      master?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "delivery";
            };
          };
      slave?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "delivery";
            };
          };
      /**
       * List of delivery's files
       */
      files?: {
        data: {
          id: string;
          type: "document";
        }[];
      };
    };
  };
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
        type: "resource";
        attributes?: {
          firstName?: string;
          lastName?: string;
          typeOf?: number;
        };
        relationships?: {
          /**
           * Resource's agency
           */
          agency?: {
            data: {
              id: string;
              type: "agency";
            };
          };
          /**
           * List of resource's contracts available on this period
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
        type: "product";
        attributes?: {
          name?: string;
          subscription?: number;
        };
      }
    | {
        id: string;
        type: "standardprofile";
        attributes?: {
          title?: string;
        };
      }
    | {
        id: string;
        type: "agency";
        attributes?: {
          name?: string;
          calendar?: string;
          /**
           * Agency's expense types
           */
          expenseTypes?: {
            reference: number;
            name: string;
            taxRate: number;
          }[];
          /**
           * Agency's advantage types with state
           */
          advantageTypes?: {
            reference: number;
            name: string;
            frequency: "punctual" | "daily" | "monthly" | "quarterly" | "semiAnnual" | "annual";
            category: "fixedAmount" | "variableSalaryBasis" | "package" | "loan";
            participationQuota: number;
            agencyQuota: number;
            employeeQuota: number;
            state: boolean;
          }[];
          /**
           * Agency's exceptional scales types
           */
          exceptionalScales?: {
            reference: number;
            name: string;
            workUnitTypes: {
              reference: number;
              name: string;
              activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
            }[];
            exceptionalRules: {
              reference: number;
              name: string;
              priceExcludingTaxOrPriceRate: number;
              grossCostOrSalaryRate: number;
            }[];
          }[];
          exchangeRate?: number;
          currency?: number;
          allowAdvantagesOnProjects?: boolean;
          allowExceptionalScalesOnProjects?: boolean;
          /**
           * List of closed periods
           */
          closedPeriods?: {
            id: string;
            parentType: "invoice" | "expensesreport" | "timesreport" | "project";
            period: string;
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
          calendar?: string;
        };
        relationships?: {
          /**
           * Delivery's project
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
          currency?: number;
          exchangeRate?: number;
          currencyAgency?: number;
          exchangeRateAgency?: number;
          workUnitRate?: number;
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
          /**
           * Project's agency
           */
          agency?: {
            data: {
              id: string;
              type: "agency";
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
          technical?:
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
      }
    | {
        id: string;
        type: "opportunity";
        attributes?: {
          title?: string;
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
        relationships?: {
          /**
           * Technical contact's company
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
        type: "company";
        attributes?: {
          name?: string;
          exceptionalScales?: {
            reference: number;
            name: string;
            workUnitTypes: {
              reference: number;
              name: string;
              activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
            }[];
            exceptionalRules: {
              reference: number;
              name: string;
              priceExcludingTaxOrPriceRate: number;
              grossCostOrSalaryRate: number;
            }[];
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
        type: "contract";
        attributes?: {
          contractAverageDailyCost?: number;
          startDate?: string;
          endDate?: string;
          monthlySalary?: number;
          /**
           * Can be updated only if `expensesDetails` is not empty
           */
          dailyExpenses?: number;
          /**
           * Can be updated only if `expensesDetails` is not empty
           */
          monthlyExpenses?: number;
          currency?: number;
          currencyAgency?: number;
          exchangeRate?: number;
          exchangeRateAgency?: number;
        };
      }
    | {
        id: string;
        type: "purchase";
        attributes?: {
          title?: string;
          reference?: string;
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
  )[];
}

/**
 * Delivery's rights
 */
export interface SchemasDeliveriesRightsJson {
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
        addAdvantage?: boolean;
        /**
         * true if this action is available
         */
        addAdvantageType?: boolean;
        /**
         * true if this action is available
         */
        displayAdvantages?: boolean;
        /**
         * true if this action is available
         */
        transformIntoPurchase?: boolean;
        /**
         * true if this action is available
         */
        downloadDeliveryOrderPDF?: boolean;
        /**
         * true if this action is available
         */
        sendResourceMail?: boolean;
        /**
         * true if this action is available
         */
        seeLogs?: boolean;
        /**
         * true if this action is available
         */
        download?: boolean;
        /**
         * true if this action is available
         */
        replaceStandardprofile?: boolean;
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
        advantages?: {
          /**
           * true if the user can read this api
           */
          read: boolean;
          /**
           * true if the user can write this api
           */
          write: boolean;
        };
        tasks?: {
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
        averageDailyCost?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        averageDailyContractCost?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        averageWorkUnitPriceExcludingTax?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        dailyExpenses?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        monthlyExpenses?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        numberOfWorkingDays?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        weeklyWorkingHours?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        averageDailyPriceExcludingTax?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        averageHourlyPriceExcludingTax?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        contract?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        "dependsOn.contracts"?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        forceAverageHourlyPriceExcludingTax?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        forceAverageDailyPriceExcludingTax?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        expensesDetails?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        advantageTypes?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        "dependsOn.agency.advantageTypes"?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        exceptionalScales?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        "exceptionalScales.exceptionalRules.grossCostOrSalaryRate"?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        "dependsOn.agency.exceptionalScales"?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        "project.company.exceptionalScales"?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        numberOfDaysInvoicedOrQuantity?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        numberOfDaysFree?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        startDate?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        endDate?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        state?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        forceTransferCreation?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        slave?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        master?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        title?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
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
        "contract.monthlySalary"?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        "contract.dailyExpenses"?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        "contract.monthlyExpenses"?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        "dependsOn.contracts.monthlySalary"?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        "dependsOn.contracts.dailyExpenses"?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        "dependsOn.contracts.monthlyExpenses"?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        turnoverSimulatedExcludingTax?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        costsSimulatedExcludingTax?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        marginSimulatedExcludingTax?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        profitabilitySimulated?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        subscriptionQuantityCharged?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        subscriptionQuantityFree?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        subscriptionPriceExcludingTax?: {
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
 * Deliveries tasks data
 */
export interface SchemasDeliveriesTasksJson {
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
    type: "task";
    attributes?: {
      description?: string;
      row?: number;
      state?: boolean;
      validatedAt?: number;
      validatedBy?: {
        id?: string;
        firstName?: string;
        lastName?: string;
      };
    };
    relationships?: {
      /**
       * List of children tasks
       */
      children?: {
        data: {
          id: string;
          type: "task";
        }[];
      };
      /**
       * Task's todolist
       */
      todolist?: {
        data: {
          id: string;
          type: "todolist";
        }[];
      };
    };
  }[];
  included?: (
    | {
        id: string;
        type: "task";
        attributes?: {
          description?: string;
          row?: number;
          state?: boolean;
          validatedAt?: number;
          validatedBy?: {
            id?: string;
            firstName?: string;
            lastName?: string;
          };
        };
      }
    | {
        id: string;
        type: "todolist";
        attributes?: {
          title?: string;
        };
      }
  )[];
}

/**
 * Delivery's basic data sent in the body with a POST method
 */
export interface SchemasDeliveriesBodyPostJson {
  data: {
    type: "delivery";
    attributes?: {
      startDate?: string;
      endDate?: string;
      title?: string;
      typeOf?: number;
      state?: number;
      /**
       * Can not be set if delivery depends on a `groupment` and `forceAverageDailyPriceExcludingTax` is false
       */
      averageDailyPriceExcludingTax?: number;
      forceAverageDailyPriceExcludingTax?: boolean;
      subscriptionQuantityCharged?: number;
      subscriptionQuantityFree?: number;
      subscriptionPriceExcludingTax?: number;
      averageDailyContractCost?: number;
      numberOfDaysInvoicedOrQuantity?: number;
      numberOfDaysFree?: number;
      informationComments?: string;
      conditions?: string;
      dailyExpenses?: number;
      monthlyExpenses?: number;
      numberOfWorkingDays?: number;
      weeklyWorkingHours?: number;
      averageHourlyPriceExcludingTax?: number;
      forceAverageHourlyPriceExcludingTax?: boolean;
      /**
       * Delivery's additional turnover and costs
       */
      additionalTurnoverAndCosts?: {
        id: string;
        date: string;
        state: boolean;
        /**
         * True if user can write on additional turnover and costs
         */
        canWriteAdditionalTurnoverAndCosts?: boolean;
        title: string;
        turnoverExcludingTax: number;
        costsExcludingTax: number;
        typeOf: number;
        purchase:
          | {
              data: null;
            }
          | {
              id: string;
              title?: string;
              subscription: number;
            };
      }[];
      /**
       * List of expenses details
       */
      expensesDetails?: (
        | {
            expenseType: {
              reference: number;
            };
            periodicity: "daily" | "monthly";
            netAmount: number;
            /**
             * Agency on which expenses detail depends
             */
            agency: {
              id: string;
            };
          }
        | {
            id: string;
            expenseType: {
              reference: number;
            };
            periodicity: "daily" | "monthly";
            netAmount: number;
            /**
             * Agency on which expenses detail depends
             */
            agency: {
              id: string;
            };
          }
      )[];
      /**
       * List of advantages
       */
      advantageTypes?: {
        reference: number;
        frequency?: "punctual" | "daily" | "monthly" | "quarterly" | "semiAnnual" | "annual";
        category?: "fixedAmount" | "variableSalaryBasis" | "package" | "loan";
        participationQuota?: number;
        agencyQuota?: number;
        employeeQuota?: number;
        /**
         * Agency on which advantage type depends
         */
        agency?: {
          id: string;
        };
      }[];
      /**
       * List of exceptional scales
       */
      exceptionalScales?: {
        reference: number;
        exceptionalRules: {
          reference: number;
          priceExcludingTaxOrPriceRate: null | number;
          grossCostOrSalaryRate: null | number;
        }[];
        dependsOn:
          | {
              id: string;
              type: "agency";
            }
          | {
              id: string;
              type: "company";
            };
      }[];
      calendar?: string;
    };
    relationships: {
      /**
       * Delivery's project
       */
      project: {
        data: {
          id: string;
          type: "project";
        };
      };
      dependsOn:
        | {
            data: {
              id: string;
              type: "resource";
            };
          }
        | {
            data: {
              id: string;
              type: "product";
            };
          };
      /**
       * Delivery's contract
       */
      contract?: {
        data: {
          id: string;
          type: "contract";
        };
      };
      /**
       * Delivery's slave
       */
      slave?: {
        data: {
          id: string;
          type: "delivery";
        };
      };
      /**
       * Delivery's groupment
       */
      groupment?: {
        data: {
          id: string;
          type: "groupment";
        };
      };
    };
  };
}

/**
 * Delivery's basic data sent in the body with a PUT method
 */
export interface SchemasDeliveriesBodyPutJson {
  data: {
    id: string;
    type: "delivery";
    attributes?: {
      startDate?: string;
      endDate?: string;
      title?: string;
      typeOf?: number;
      state?: number;
      /**
       * Can not be set if delivery depends on a `groupment` and `forceAverageDailyPriceExcludingTax` is false
       */
      averageDailyPriceExcludingTax?: number;
      forceAverageDailyPriceExcludingTax?: boolean;
      subscriptionQuantityCharged?: number;
      subscriptionQuantityFree?: number;
      subscriptionPriceExcludingTax?: number;
      averageDailyContractCost?: number;
      numberOfDaysInvoicedOrQuantity?: number;
      numberOfDaysFree?: number;
      informationComments?: string;
      conditions?: string;
      dailyExpenses?: number;
      monthlyExpenses?: number;
      numberOfWorkingDays?: number;
      weeklyWorkingHours?: number;
      averageHourlyPriceExcludingTax?: number;
      forceAverageHourlyPriceExcludingTax?: boolean;
      /**
       * Delivery's additional turnover and costs
       */
      additionalTurnoverAndCosts?: {
        id: string;
        date: string;
        state: boolean;
        /**
         * True if user can write on additional turnover and costs
         */
        canWriteAdditionalTurnoverAndCosts?: boolean;
        title: string;
        turnoverExcludingTax: number;
        costsExcludingTax: number;
        typeOf: number;
        purchase:
          | {
              data: null;
            }
          | {
              id: string;
              title?: string;
              subscription: number;
            };
      }[];
      /**
       * List of expenses details
       */
      expensesDetails?: (
        | {
            expenseType: {
              reference: number;
            };
            periodicity: "daily" | "monthly";
            netAmount: number;
            /**
             * Agency on which expenses detail depends
             */
            agency: {
              id: string;
            };
          }
        | {
            id: string;
            expenseType: {
              reference: number;
            };
            periodicity: "daily" | "monthly";
            netAmount: number;
            /**
             * Agency on which expenses detail depends
             */
            agency: {
              id: string;
            };
          }
      )[];
      /**
       * List of advantages
       */
      advantageTypes?: {
        reference: number;
        frequency?: "punctual" | "daily" | "monthly" | "quarterly" | "semiAnnual" | "annual";
        category?: "fixedAmount" | "variableSalaryBasis" | "package" | "loan";
        participationQuota?: number;
        agencyQuota?: number;
        employeeQuota?: number;
        /**
         * Agency on which advantage type depends
         */
        agency?: {
          id: string;
        };
      }[];
      /**
       * List of exceptional scales
       */
      exceptionalScales?: {
        reference: number;
        exceptionalRules: {
          reference: number;
          priceExcludingTaxOrPriceRate: null | number;
          grossCostOrSalaryRate: null | number;
        }[];
        dependsOn:
          | {
              id: string;
              type: "agency";
            }
          | {
              id: string;
              type: "company";
            };
      }[];
      calendar?: string;
    };
    relationships?: {
      dependsOn?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      contract?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "contract";
            };
          };
      slave?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "delivery";
            };
          };
    };
  };
}

/**
 * Delivery's data sent to these emails
 */
export interface SchemasDeliveriesSendJson {
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
    type: "delivery";
    attributes?: {
      emails?: string[];
    };
  };
}


// ─── contracts ───
/**
 * Contract's basic data
 */
export interface SchemasContractsProfileJson {
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
      code: "wrongContractAverageDailyCost" | "wrongContractAverageDailyCostCandidate";
      /**
       * Warning's message
       */
      detail: string;
      databaseContractAverageDailyCost?: number;
    }[];
  };
  data: {
    id: string;
    type: "contract";
    attributes?: {
      typeOf?: number;
      creationDate?: string;
      updateDate?: string;
      employeeType?: number;
      workingTimeType?: number;
      numberOfHoursPerWeek?: number;
      classification?: string;
      startDate?: string;
      endDate?: string;
      endReason?: number;
      probationState?: number;
      probationEndDate?: string;
      renewalProbationEndDate?: string;
      monthlySalary?: number;
      hourlySalary?: number;
      forceHourlySalary?: boolean;
      contractAverageDailyCost?: number;
      /**
       * Can be updated only if `forceContractAverageDailyProductionCost` = true or the contract depends on an external resource
       */
      contractAverageDailyProductionCost?: number;
      forceContractAverageDailyProductionCost?: boolean;
      /**
       * Can be updated only if `expensesDetails` is not empty
       */
      dailyExpenses?: number;
      /**
       * Can be updated only if `expensesDetails` is not empty
       */
      monthlyExpenses?: number;
      numberOfWorkingDays?: number;
      chargeFactor?: number;
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
      }[];
      /**
       * List of advantages
       */
      advantageTypes?: {
        reference: number;
        name: string;
        frequency: "punctual" | "daily" | "monthly" | "quarterly" | "semiAnnual" | "annual";
        category: "fixedAmount" | "variableSalaryBasis" | "package" | "loan";
        participationQuota: number;
        agencyQuota: number;
        employeeQuota: number;
        default?: boolean;
        state?: boolean;
      }[];
      /**
       * List of exceptional scales
       */
      exceptionalScales?: {
        reference: number;
        name: string;
        workUnitTypes: {
          reference: number;
          name: string;
          activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
        }[];
        exceptionalRules: {
          reference: number;
          name: string;
          priceExcludingTaxOrPriceRate: null | number;
          grossCostOrSalaryRate: null | number;
        }[];
      }[];
      informationComments?: string;
      currency?: number;
      currencyAgency?: number;
      exchangeRate?: number;
      exchangeRateAgency?: number;
      calendar?: string;
      activityRate?: number;
      partialWorkTimes?: string[];
      isPartialWorkTimeEvenOdd?: boolean;
    };
    relationships?: {
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
       * Contract's agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
        };
      };
      parentContract?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "contract";
            };
          };
      childContract?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "contract";
            };
          };
      /**
       * List of contract's files
       */
      files?: {
        data: {
          id: string;
          type: "document";
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
            typeOf?: number;
            workUnitRate?: "notUsed" | number;
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
          };
        }
      | {
          id: string;
          type: "candidate";
          attributes?: {
            firstName?: string;
            lastName?: string;
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
          };
        }
      | {
          id: string;
          type: "agency";
          attributes?: {
            name?: string;
            currency?: number;
            exchangeRate?: number;
            /**
             * Agency's expense types
             */
            expenseTypes?: {
              reference: number;
              name: string;
              state?: boolean;
              taxRate: number;
            }[];
            /**
             * Agency's advantage types
             */
            advantageTypes?: {
              reference: number;
              name: string;
              frequency: "punctual" | "daily" | "monthly" | "quarterly" | "semiAnnual" | "annual";
              category: "fixedAmount" | "variableSalaryBasis" | "package" | "loan";
              participationQuota: number;
              agencyQuota: number;
              employeeQuota: number;
              default?: boolean;
              state?: boolean;
            }[];
            allowExceptionalScalesOnContracts?: boolean;
            /**
             * Agency's exceptional scales types
             */
            exceptionalScales?: {
              reference: number;
              name: string;
              workUnitTypes: {
                reference: number;
                name: string;
                activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
              }[];
              exceptionalRules: {
                reference: number;
                name: string;
                priceExcludingTaxOrPriceRate: number;
                grossCostOrSalaryRate: number;
              }[];
            }[];
            chargeFactor?: number;
            contractsSalaryType?: "monthly" | "annual";
            calendar?: string;
            workUnitRate?: "notUsed" | number;
          };
        }
      | {
          id: string;
          type: "contract";
          attributes?: {
            startDate?: string;
          };
        }
      | {
          id: string;
          type: "document";
          attributes?: {
            name?: string;
          };
          relationships?: {
            id?: number;
            type?: "esignature";
          };
        }
      | {
          id: number;
          type: "esignature";
          attributes?: {
            state?: "created" | "waiting" | "signed" | "cancelled" | "expired";
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
            typeOf?: number;
            workUnitRate?: "notUsed" | number;
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
          };
        }
      | {
          id: string;
          type: "candidate";
          attributes?: {
            firstName?: string;
            lastName?: string;
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
          };
        }
      | {
          id: string;
          type: "agency";
          attributes?: {
            name?: string;
            currency?: number;
            exchangeRate?: number;
            /**
             * Agency's expense types
             */
            expenseTypes?: {
              reference: number;
              name: string;
              state?: boolean;
              taxRate: number;
            }[];
            /**
             * Agency's advantage types
             */
            advantageTypes?: {
              reference: number;
              name: string;
              frequency: "punctual" | "daily" | "monthly" | "quarterly" | "semiAnnual" | "annual";
              category: "fixedAmount" | "variableSalaryBasis" | "package" | "loan";
              participationQuota: number;
              agencyQuota: number;
              employeeQuota: number;
              default?: boolean;
              state?: boolean;
            }[];
            allowExceptionalScalesOnContracts?: boolean;
            /**
             * Agency's exceptional scales types
             */
            exceptionalScales?: {
              reference: number;
              name: string;
              workUnitTypes: {
                reference: number;
                name: string;
                activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
              }[];
              exceptionalRules: {
                reference: number;
                name: string;
                priceExcludingTaxOrPriceRate: number;
                grossCostOrSalaryRate: number;
              }[];
            }[];
            chargeFactor?: number;
            contractsSalaryType?: "monthly" | "annual";
            calendar?: string;
            workUnitRate?: "notUsed" | number;
          };
        }
      | {
          id: string;
          type: "contract";
          attributes?: {
            startDate?: string;
          };
        }
      | {
          id: string;
          type: "document";
          attributes?: {
            name?: string;
          };
          relationships?: {
            id?: number;
            type?: "esignature";
          };
        }
      | {
          id: number;
          type: "esignature";
          attributes?: {
            state?: "created" | "waiting" | "signed" | "cancelled" | "expired";
          };
        }
    )[]
  ];
}

/**
 * Empty contract's default basic data
 */
export interface SchemasContractsDefaultJson {
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
      code: "wrongContractAverageDailyCost" | "wrongContractAverageDailyCostCandidate";
      /**
       * Warning's message
       */
      detail: string;
      databaseContractAverageDailyCost?: number;
    }[];
  };
  data: {
    id: "0";
    type: "contract";
    attributes?: {
      typeOf?: number;
      employeeType?: number;
      workingTimeType?: number;
      numberOfHoursPerWeek?: number;
      classification?: string;
      startDate?: string;
      endDate?: string;
      monthlySalary?: number;
      hourlySalary?: number;
      forceHourlySalary?: boolean;
      forceContractAverageDailyProductionCost?: boolean;
      contractAverageDailyCost?: number;
      /**
       * Can be updated only if `forceContractAverageDailyProductionCost` = true or the contract depends on an external resource
       */
      contractAverageDailyProductionCost?: number;
      /**
       * Can be updated only if `expensesDetails` is not empty
       */
      dailyExpenses?: number;
      /**
       * Can be updated only if `expensesDetails` is not empty
       */
      monthlyExpenses?: number;
      numberOfWorkingDays?: number;
      chargeFactor?: number;
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
      }[];
      /**
       * List of advantages
       */
      advantageTypes?: {
        reference: number;
        name: string;
        frequency: "punctual" | "daily" | "monthly" | "quarterly" | "semiAnnual" | "annual";
        category: "fixedAmount" | "variableSalaryBasis" | "package" | "loan";
        participationQuota: number;
        agencyQuota: number;
        employeeQuota: number;
        default?: boolean;
        state?: boolean;
      }[];
      /**
       * List of exceptional scales
       */
      exceptionalScales?: {
        reference: number;
        name: string;
        workUnitTypes: {
          reference: number;
          name: string;
          activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
        }[];
        exceptionalRules: {
          reference: number;
          name: string;
          priceExcludingTaxOrPriceRate: null | number;
          grossCostOrSalaryRate: null | number;
        }[];
      }[];
      informationComments?: string;
      currency?: number;
      currencyAgency?: number;
      exchangeRate?: number;
      exchangeRateAgency?: number;
      calendar?: string;
      activityRate?: number;
      partialWorkTimes?: string[];
      isPartialWorkTimeEvenOdd?: boolean;
    };
    relationships?: {
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
          };
      /**
       * Contract's agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
        };
      };
      parentContract?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "contract";
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
            typeOf?: number;
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
          };
        }
      | {
          id: string;
          type: "candidate";
          attributes?: {
            firstName?: string;
            lastName?: string;
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
          };
        }
      | {
          id: string;
          type: "agency";
          attributes?: {
            name?: string;
            contractsSalaryType?: "monthly" | "annual";
            /**
             * Agency's expense types
             */
            expenseTypes?: {
              reference: number;
              name: string;
              taxRate: number;
            }[];
            /**
             * Agency's advantage types
             */
            advantageTypes?: {
              reference: number;
              name: string;
              frequency: "punctual" | "daily" | "monthly" | "quarterly" | "semiAnnual" | "annual";
              category: "fixedAmount" | "variableSalaryBasis" | "package" | "loan";
              participationQuota: number;
              agencyQuota: number;
              employeeQuota: number;
              default?: boolean;
              state?: boolean;
            }[];
            allowExceptionalScalesOnContracts?: boolean;
            /**
             * Agency's exceptional scales types
             */
            exceptionalScales?: {
              reference: number;
              name: string;
              workUnitTypes: {
                reference: number;
                name: string;
                activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
              }[];
              exceptionalRules: {
                reference: number;
                name: string;
                priceExcludingTaxOrPriceRate: number;
                grossCostOrSalaryRate: number;
              }[];
            }[];
            workUnitRate?: "notUsed" | number;
          };
        }
      | {
          id: string;
          type: "contract";
          attributes?: {
            startDate?: string;
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
            typeOf?: number;
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
          };
        }
      | {
          id: string;
          type: "candidate";
          attributes?: {
            firstName?: string;
            lastName?: string;
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
          };
        }
      | {
          id: string;
          type: "agency";
          attributes?: {
            name?: string;
            contractsSalaryType?: "monthly" | "annual";
            /**
             * Agency's expense types
             */
            expenseTypes?: {
              reference: number;
              name: string;
              taxRate: number;
            }[];
            /**
             * Agency's advantage types
             */
            advantageTypes?: {
              reference: number;
              name: string;
              frequency: "punctual" | "daily" | "monthly" | "quarterly" | "semiAnnual" | "annual";
              category: "fixedAmount" | "variableSalaryBasis" | "package" | "loan";
              participationQuota: number;
              agencyQuota: number;
              employeeQuota: number;
              default?: boolean;
              state?: boolean;
            }[];
            allowExceptionalScalesOnContracts?: boolean;
            /**
             * Agency's exceptional scales types
             */
            exceptionalScales?: {
              reference: number;
              name: string;
              workUnitTypes: {
                reference: number;
                name: string;
                activityType: "production" | "absence" | "internal" | "exceptionalTime" | "exceptionalCalendar";
              }[];
              exceptionalRules: {
                reference: number;
                name: string;
                priceExcludingTaxOrPriceRate: number;
                grossCostOrSalaryRate: number;
              }[];
            }[];
            workUnitRate?: "notUsed" | number;
          };
        }
      | {
          id: string;
          type: "contract";
          attributes?: {
            startDate?: string;
          };
        }
    )[]
  ];
}

/**
 * Contract's rights
 */
export interface SchemasContractsRightsJson {
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
        addAdvantage?: boolean;
        /**
         * true if this action is available
         */
        addAmendment?: boolean;
        /**
         * true if this action is available
         */
        download?: boolean;
        /**
         * true if this action is available
         */
        seeLogs?: boolean;
        /**
         * true if this action is available
         */
        addESignature?: boolean;
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
        advantages?: {
          /**
           * true if the user can read this api
           */
          read: boolean;
          /**
           * true if the user can write this api
           */
          write: boolean;
        };
        tasks?: {
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
        hourlySalary?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        monthlySalary?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        chargeFactor?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        forceHourlySalary?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        advantageTypes?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        exceptionalScales?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        forceContractAverageDailyProductionCost?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        contractAverageDailyProductionCost?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        "agency.exceptionalScales"?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        probationEndDate?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        renewalProbationEndDate?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        startDate?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        endDate?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
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
      };
    };
  };
}

/**
 * Contract's advantages
 */
export interface SchemasContractsAdvantagesJson {
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
    type: "advantage";
    attributes?: {
      date?: string;
      advantageType?: {
        reference: number;
        name: string;
      };
      quantity?: number;
      /**
       * employeeAmount * quantity
       */
      costPaid?: number;
      currency?: number;
      exchangeRate?: number;
      currencyAgency?: number;
      exchangeRateAgency?: number;
      /**
       * If false then advantage is not accessible
       */
      canReadAdvantage?: boolean;
      /**
       * If false then advantage is editable
       */
      canWriteAdvantage?: boolean;
    };
    relationships?: {
      /**
       * Advantage's agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
        };
      };
    };
  }[];
  included?: {
    id: string;
    type: "agency";
    attributes?: {
      name?: string;
    };
  }[];
}

/**
 * Contracts tasks data
 */
export interface SchemasContractsTasksJson {
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
    additionalTasks?: {
      /**
       * Signature's creator
       */
      createdBy?: {
        id: string;
        /**
         * Creator firstname
         */
        firstName: string;
        /**
         * Creator lastname
         */
        lastName: string;
      };
      date?: string;
      file?: {
        /**
         * File or document id
         */
        id: number;
        /**
         * File or document name
         */
        name: string;
      };
      state?: "created" | "waiting" | "signed" | "cancelled" | "expired";
      /**
       * Subtitle for task API
       */
      subtitle?: string;
      type?: "esignature";
      typeOf?: "candidate" | "contract" | "opportunity" | "resource";
      recipients?: {
        data?: {
          id: number;
          /**
           * Recipient firstname
           */
          firstName?: string;
          /**
           * Recipient lastname
           */
          lastName?: string;
          state?: "waiting" | "signed" | "refused";
          comment?: string;
          date?: string;
        }[];
      };
    }[];
  };
  data: {
    id: string;
    type: "task";
    attributes?: {
      description?: string;
      row?: number;
      state?: boolean;
      validatedAt?: number;
      validatedBy?: {
        id?: string;
        firstName?: string;
        lastName?: string;
      };
    };
    relationships?: {
      /**
       * List of children tasks
       */
      children?: {
        data: {
          id: string;
          type: "task";
        }[];
      };
      /**
       * Task's todolist
       */
      todolist?: {
        data: {
          id: string;
          type: "todolist";
        }[];
      };
    };
  }[];
  included?: (
    | {
        id: string;
        type: "task";
        attributes?: {
          description?: string;
          row?: number;
          state?: boolean;
          validatedAt?: number;
          validatedBy?: {
            id?: string;
            firstName?: string;
            lastName?: string;
          };
        };
      }
    | {
        id: string;
        type: "todolist";
        attributes?: {
          title?: string;
        };
      }
  )[];
}

/**
 * Contract's basic data sent in the body with a POST method
 */
export interface SchemasContractsBodyPostJson {
  data: {
    type: "contract";
    attributes?: {
      typeOf?: number;
      employeeType?: number;
      workingTimeType?: number;
      numberOfHoursPerWeek?: number;
      classification?: string;
      startDate?: string;
      endDate?: string;
      probationState?: number;
      probationEndDate?: string;
      renewalProbationEndDate?: string;
      monthlySalary?: number;
      hourlySalary?: number;
      forceHourlySalary?: boolean;
      forceContractAverageDailyProductionCost?: boolean;
      /**
       * Can be updated only if `forceContractAverageDailyProductionCost` = true or the contract depends on an external resource
       */
      contractAverageDailyProductionCost?: number;
      /**
       * Can be updated only if `expensesDetails` is not empty
       */
      dailyExpenses?: number;
      /**
       * Can be updated only if `expensesDetails` is not empty
       */
      monthlyExpenses?: number;
      numberOfWorkingDays?: number;
      chargeFactor?: number;
      /**
       * List of expenses details
       */
      expensesDetails?: (
        | {
            expenseType: {
              reference: number;
            };
            periodicity: "daily" | "monthly";
            netAmount: number;
          }
        | {
            id: string;
            expenseType: {
              reference: number;
            };
            periodicity: "daily" | "monthly";
            netAmount: number;
          }
      )[];
      /**
       * List of advantages
       */
      advantageTypes?: {
        reference: number;
      }[];
      /**
       * List of exceptional scales
       */
      exceptionalScales?: {
        reference: number;
        exceptionalRules: {
          reference: number;
          priceExcludingTaxOrPriceRate: null | number;
          grossCostOrSalaryRate: null | number;
        }[];
      }[];
      informationComments?: string;
      currency?: number;
      currencyAgency?: number;
      exchangeRate?: number;
      exchangeRateAgency?: number;
      calendar?: string;
      activityRate?: number;
      partialWorkTimes?: string[];
      isPartialWorkTimeEvenOdd?: boolean;
    };
    relationships: {
      dependsOn:
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
          };
      /**
       * Contract's agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
        };
      };
      /**
       * Contract's parent
       */
      parentContract?: {
        data: {
          id: string;
          type: "contract";
        };
      };
    };
  };
}

/**
 * Contract's basic data sent in the body with a PUT method
 */
export interface SchemasContractsBodyPutJson {
  data: {
    id: string;
    type: "contract";
    attributes?: {
      typeOf?: number;
      employeeType?: number;
      workingTimeType?: number;
      numberOfHoursPerWeek?: number;
      classification?: string;
      startDate?: string;
      endDate?: string;
      probationState?: number;
      probationEndDate?: string;
      renewalProbationEndDate?: string;
      monthlySalary?: number;
      hourlySalary?: number;
      forceHourlySalary?: boolean;
      forceContractAverageDailyProductionCost?: boolean;
      /**
       * Can be updated only if `forceContractAverageDailyProductionCost` = true or the contract depends on an external resource
       */
      contractAverageDailyProductionCost?: number;
      /**
       * Can be updated only if `expensesDetails` is not empty
       */
      dailyExpenses?: number;
      /**
       * Can be updated only if `expensesDetails` is not empty
       */
      monthlyExpenses?: number;
      numberOfWorkingDays?: number;
      chargeFactor?: number;
      /**
       * List of expenses details
       */
      expensesDetails?: (
        | {
            expenseType: {
              reference: number;
            };
            periodicity: "daily" | "monthly";
            netAmount: number;
          }
        | {
            id: string;
            expenseType: {
              reference: number;
            };
            periodicity: "daily" | "monthly";
            netAmount: number;
          }
      )[];
      /**
       * List of advantages
       */
      advantageTypes?: {
        reference: number;
      }[];
      /**
       * List of exceptional scales
       */
      exceptionalScales?: {
        reference: number;
        exceptionalRules: {
          reference: number;
          priceExcludingTaxOrPriceRate: null | number;
          grossCostOrSalaryRate: null | number;
        }[];
      }[];
      informationComments?: string;
      currency?: number;
      currencyAgency?: number;
      exchangeRate?: number;
      exchangeRateAgency?: number;
      calendar?: string;
      activityRate?: number;
      partialWorkTimes?: string[];
      isPartialWorkTimeEvenOdd?: boolean;
    };
  };
}


// ─── flags ───
/**
 * List of flags
 */
export interface SchemasFlagsSearchJson {
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
    type: "flag";
    attributes?: {
      name?: string;
      /**
       * If false then positioning is not accessible
       */
      canReadFlag?: boolean;
      /**
       * If false then positioning is not editable
       */
      canWriteFlag?: boolean;
    };
    relationships?: {
      /**
       * Flag's main manager
       */
      mainManager?: {
        data: {
          id: string;
          type: "resource";
        };
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
 * Flag's basic data
 */
export interface SchemasFlagsProfileJson {
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
    type: "flag";
    attributes?: {
      name?: string;
    };
    relationships?: {
      /**
       * Flag's main manager
       */
      mainManager?: {
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
      lastName?: string;
      firstName?: string;
    };
  }[];
}

/**
 * flag's basic data sent in the body with a POST method
 */
export interface SchemasFlagsBodyPostJson {
  data: {
    type: "flag";
    attributes: {
      name: string;
    };
    relationships: {
      /**
       * Flag's main manager
       */
      mainManager?: {
        data: {
          id: string;
          type: "resource";
        };
      };
    };
  };
}

/**
 * Flag's basic data sent in the body with a PUT method
 */
export interface SchemasFlagsBodyPutJson {
  data: {
    id: string;
    type: "flag";
    attributes?: {
      name?: string;
    };
    relationships?: {
      /**
       * Flag's main manager
       */
      mainManager?: {
        data: {
          id: string;
          type: "resource";
        };
      };
    };
  };
}


// ─── inactivities ───
/**
 * Inactivity's basic data
 */
export interface SchemasInactivitiesProfileJson {
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
    type: "inactivity";
    attributes?: {
      startDate?: string;
      endDate?: string;
      title?: string;
      averageDailyCost?: number;
      averageDailyContractCost?: number;
      numberOfDaysInvoicedOrQuantity?: number;
      informationComments?: string;
      /**
       * Sum of all costs on delivery & additional data excluding tax
       */
      costsSimulatedExcludingTax?: number;
      /**
       * (numberOfDaysInvoicedOrQuantity +  numberOfDaysFree) / number of working days or periods between startDate and endDate, only available if delivery is not a `groupment` and project's type is not `product`
       */
      occupationRate?: number;
      dailyExpenses?: number;
      monthlyExpenses?: number;
      numberOfWorkingDays?: number;
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
      inactivityType?: "internal" | "absence";
      currency?: number;
      exchangeRate?: number;
      currencyAgency?: number;
      exchangeRateAgency?: number;
      creationDate?: string;
      updateDate?: string;
    };
    relationships?: {
      /**
       * Inactivity's resource
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
      contract?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "contract";
            };
          };
      /**
       * List of inactivity's files
       */
      files?: {
        data: {
          id: string;
          type: "document";
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
          typeOf?: number;
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
          /**
           * List of resource's contracts available on this period
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
          /**
           * Agency's expense types
           */
          expenseTypes?: {
            reference: number;
            name: string;
            taxRate: number;
          }[];
          exchangeRate?: number;
          currency?: number;
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
        type: "contract";
        attributes?: {
          contractAverageDailyCost?: number;
          monthlySalary?: number;
          /**
           * Can be updated only if `expensesDetails` is not empty
           */
          dailyExpenses?: number;
          /**
           * Can be updated only if `expensesDetails` is not empty
           */
          monthlyExpenses?: number;
          currency?: number;
          currencyAgency?: number;
          exchangeRate?: number;
          exchangeRateAgency?: number;
        };
      }
  )[];
}

/**
 * Inactivity's basic data
 */
export interface SchemasInactivitiesDefaultJson {
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
    id: "0";
    type: "inactivity";
    attributes?: {
      startDate?: string;
      endDate?: string;
      title?: string;
      averageDailyContractCost?: number;
      numberOfWorkingDays?: number;
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
      inactivityType?: "internal" | "absence";
      currency?: number;
      exchangeRate?: number;
      currencyAgency?: number;
      exchangeRateAgency?: number;
    };
    relationships?: {
      /**
       * Inactivity's resource
       */
      resource?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      contract?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "contract";
            };
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
          typeOf?: number;
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
          /**
           * List of resource's contracts available on this period
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
          /**
           * Agency's expense types
           */
          expenseTypes?: {
            reference: number;
            name: string;
            taxRate: number;
          }[];
          exchangeRate?: number;
          currency?: number;
        };
      }
    | {
        id: string;
        type: "contract";
        attributes?: {
          contractAverageDailyCost?: number;
          monthlySalary?: number;
          /**
           * Can be updated only if `expensesDetails` is not empty
           */
          dailyExpenses?: number;
          /**
           * Can be updated only if `expensesDetails` is not empty
           */
          monthlyExpenses?: number;
          currency?: number;
          currencyAgency?: number;
          exchangeRate?: number;
          exchangeRateAgency?: number;
        };
      }
  )[];
}

/**
 * Delivery's rights
 */
export interface SchemasInactivitiesRightsJson {
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
        averageDailyContractCost?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        dailyExpenses?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        monthlyExpenses?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        numberOfWorkingDays?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        contract?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        "resource.contracts"?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        expensesDetails?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
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
      };
    };
  };
}

/**
 * Inactivity's basic data sent in the body with a POST method
 */
export interface SchemasInactivitiesBodyPostJson {
  data: {
    type: "delivery";
    attributes?: {
      startDate?: string;
      endDate?: string;
      title?: string;
      averageDailyContractCost?: number;
      numberOfDaysInvoicedOrQuantity?: number;
      informationComments?: string;
      dailyExpenses?: number;
      monthlyExpenses?: number;
      numberOfWorkingDays?: number;
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
      currency?: number;
      exchangeRate?: number;
      currencyAgency?: number;
      exchangeRateAgency?: number;
      inactivityType?: "internal" | "absence";
    };
    relationships: {
      /**
       * Inactivity's resource
       */
      resource: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Inactivity's contract
       */
      contract?: {
        data: {
          id: string;
          type: "contract";
        };
      };
    };
  };
}

/**
 * Inactivity's basic data sent in the body with a PUT method
 */
export interface SchemasInactivitiesBodyPutJson {
  data: {
    id: string;
    type: "inactivity";
    attributes?: {
      startDate?: string;
      endDate?: string;
      title?: string;
      averageDailyContractCost?: number;
      numberOfDaysInvoicedOrQuantity?: number;
      informationComments?: string;
      dailyExpenses?: number;
      monthlyExpenses?: number;
      numberOfWorkingDays?: number;
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
      currency?: number;
      exchangeRate?: number;
      currencyAgency?: number;
      exchangeRateAgency?: number;
      inactivityType?: "internal" | "absence";
    };
    relationships?: {
      contract?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "contract";
            };
          };
    };
  };
}


// ─── advantages ───
/**
 * Advantage's basic data
 */
export interface SchemasAdvantagesProfileJson {
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
    type: "advantage";
    attributes?: {
      creationDate?: string;
      updateDate?: string;
      date?: string;
      returnDate?: string;
      advantageType?: {
        reference: number;
        name?: string;
        frequency: "punctual" | "daily" | "monthly" | "quarterly" | "semiAnnual" | "annual";
        category: "fixedAmount" | "variableSalaryBasis" | "package" | "loan";
        participationQuota: number;
        agencyQuota: number;
        employeeQuota: number;
      };
      quantity?: number;
      participationAmount?: number;
      agencyAmount?: number;
      employeeAmount?: number;
      /**
       * employeeAmount * quantity
       */
      costPaid?: number;
      costCharged?: number;
      informationComments?: string;
      currency?: number;
      currencyAgency?: number;
      exchangeRate?: number;
      exchangeRateAgency?: number;
      /**
       * Define if advantage is closed for agency
       */
      closed?: boolean;
    };
    relationships?: {
      /**
       * Advantage's resource
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
      contract?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "contract";
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
      /**
       * Advantage's agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
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
            typeOf?: number;
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
          type: "agency";
          attributes?: {
            name?: string;
          };
        }
      | {
          id: string;
          type: "contract";
          attributes?: {
            monthlySalary?: number;
          };
        }
      | {
          id: string;
          type: "delivery";
          relationships?: {
            contract?:
              | {
                  data: null;
                }
              | {
                  data: {
                    id: string;
                    type: "delivery";
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
            typeOf?: number;
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
          type: "agency";
          attributes?: {
            name?: string;
          };
        }
      | {
          id: string;
          type: "contract";
          attributes?: {
            monthlySalary?: number;
          };
        }
      | {
          id: string;
          type: "delivery";
          relationships?: {
            contract?:
              | {
                  data: null;
                }
              | {
                  data: {
                    id: string;
                    type: "delivery";
                  };
                };
          };
        }
    )[]
  ];
}

/**
 * Empty action's default basic data
 */
export interface SchemasAdvantagesDefaultJson {
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
    id: "0";
    type: "advantage";
    attributes?: {
      advantageType?: {
        reference: number;
        name?: string;
        frequency: "punctual" | "daily" | "monthly" | "quarterly" | "semiAnnual" | "annual";
        category: "fixedAmount" | "variableSalaryBasis" | "package" | "loan";
        participationQuota: number;
        agencyQuota: number;
        employeeQuota: number;
      };
      participationAmount?: number;
      agencyAmount?: number;
      employeeAmount?: number;
      currency?: number;
      currencyAgency?: number;
      exchangeRate?: number;
      exchangeRateAgency?: number;
    };
    relationships?: {
      /**
       * Advantage's resource
       */
      resource?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      contract?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "contract";
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
      /**
       * Advantage's agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
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
            typeOf?: number;
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
          };
        }
      | {
          id: string;
          type: "project";
          attributes?: {
            reference?: string;
            currencyAgency?: number;
            exchangeRateAgency?: number;
          };
        }
      | {
          id: string;
          type: "agency";
          attributes?: {
            name?: string;
            /**
             * Agency's advantage types
             */
            advantageTypes?: {
              reference: number;
              name: string;
              frequency: "punctual" | "daily" | "monthly" | "quarterly" | "semiAnnual" | "annual";
              category: "fixedAmount" | "variableSalaryBasis" | "package" | "loan";
              participationQuota: number;
              agencyQuota: number;
              employeeQuota: number;
            }[];
          };
        }
      | {
          id: string;
          type: "contract";
          attributes?: {
            monthlySalary?: number;
            /**
             * List of advantages
             */
            advantageTypes?: {
              reference: number;
              name: string;
              frequency: "punctual" | "daily" | "monthly" | "quarterly" | "semiAnnual" | "annual";
              category: "fixedAmount" | "variableSalaryBasis" | "package" | "loan";
              participationQuota: number;
              agencyQuota: number;
              employeeQuota: number;
              default?: boolean;
              state?: boolean;
            }[];
          };
        }
      | {
          id: string;
          type: "delivery";
          attributes?: {
            /**
             * List of advantages
             */
            advantageTypes?: {
              reference: number;
              name: string;
              frequency: "punctual" | "daily" | "monthly" | "quarterly" | "semiAnnual" | "annual";
              category: "fixedAmount" | "variableSalaryBasis" | "package" | "loan";
              participationQuota: number;
              agencyQuota: number;
              employeeQuota: number;
              /**
               * Agency on which advantage type depends
               */
              agency: {
                id: string;
                name: string;
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
            typeOf?: number;
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
          };
        }
      | {
          id: string;
          type: "project";
          attributes?: {
            reference?: string;
            currencyAgency?: number;
            exchangeRateAgency?: number;
          };
        }
      | {
          id: string;
          type: "agency";
          attributes?: {
            name?: string;
            /**
             * Agency's advantage types
             */
            advantageTypes?: {
              reference: number;
              name: string;
              frequency: "punctual" | "daily" | "monthly" | "quarterly" | "semiAnnual" | "annual";
              category: "fixedAmount" | "variableSalaryBasis" | "package" | "loan";
              participationQuota: number;
              agencyQuota: number;
              employeeQuota: number;
            }[];
          };
        }
      | {
          id: string;
          type: "contract";
          attributes?: {
            monthlySalary?: number;
            /**
             * List of advantages
             */
            advantageTypes?: {
              reference: number;
              name: string;
              frequency: "punctual" | "daily" | "monthly" | "quarterly" | "semiAnnual" | "annual";
              category: "fixedAmount" | "variableSalaryBasis" | "package" | "loan";
              participationQuota: number;
              agencyQuota: number;
              employeeQuota: number;
              default?: boolean;
              state?: boolean;
            }[];
          };
        }
      | {
          id: string;
          type: "delivery";
          attributes?: {
            /**
             * List of advantages
             */
            advantageTypes?: {
              reference: number;
              name: string;
              frequency: "punctual" | "daily" | "monthly" | "quarterly" | "semiAnnual" | "annual";
              category: "fixedAmount" | "variableSalaryBasis" | "package" | "loan";
              participationQuota: number;
              agencyQuota: number;
              employeeQuota: number;
              /**
               * Agency on which advantage type depends
               */
              agency: {
                id: string;
                name: string;
              };
            }[];
          };
        }
    )[]
  ];
}

/**
 * Advantage's rights
 */
export interface SchemasAdvantagesRightsJson {
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
        date?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        returnDate?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        quantity?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        participationAmount?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        agencyAmount?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        employeeAmount?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        costPaid?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        costCharged?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        currency?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        currencyAgency?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        exchangeRate?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        exchangeRateAgency?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        project?: {
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
 * Action's basic data sent in the body with a POST method
 */
export interface SchemasAdvantagesBodyPostJson {
  data: {
    type: "advantage";
    attributes?: {
      date?: string;
      returnDate?: string;
      advantageType: {
        reference: number;
        name?: string;
        frequency: "punctual" | "daily" | "monthly" | "quarterly" | "semiAnnual" | "annual";
        category: "fixedAmount" | "variableSalaryBasis" | "package" | "loan";
        participationQuota: number;
        agencyQuota: number;
        employeeQuota: number;
      };
      quantity?: number;
      participationAmount?: number;
      agencyAmount?: number;
      employeeAmount?: number;
      informationComments?: string;
      currency?: number;
      currencyAgency?: number;
      exchangeRate?: number;
      exchangeRateAgency?: number;
    };
    relationships: {
      /**
       * Advantage's resource
       */
      resource: {
        data: {
          id: string;
          type: "resource";
        };
      };
      contract?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "contract";
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
    };
  };
}

/**
 * Advantage's basic data sent in the body with a PUT method
 */
export interface SchemasAdvantagesBodyPutJson {
  data: {
    id: string;
    type: "advantage";
    attributes?: {
      date?: string;
      returnDate?: string;
      quantity?: number;
      participationAmount?: number;
      agencyAmount?: number;
      employeeAmount?: number;
      informationComments?: string;
      currency?: number;
      currencyAgency?: number;
      exchangeRate?: number;
      exchangeRateAgency?: number;
    };
  };
}


// ─── alerts ───
/**
 * List of alerts for dashboard
 */
export interface SchemasAlertsSearchJson {
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
    type: "alert";
    attributes?: {
      indicator?:
        | "actionsUpcoming"
        | "actionsOfTheDay"
        | "actionsLate"
        | "timesReportsWithNoValidation"
        | "expensesReportsWithNoValidation"
        | "absencesReportsWithNoValidation"
        | "candidatesWithNoAction"
        | "candidatesNotUpdated"
        | "resourcesWithNoAction"
        | "resourcesWithNoContracts"
        | "resourcesWithNoMoreContracts"
        | "resourcesProbationaryDateUpcoming"
        | "resourcesProbationaryDateToday"
        | "resourcesProbationaryDateTerminated"
        | "contractsEndedUpcoming"
        | "contractsEndedToday"
        | "contractsEnded"
        | "resourcesWithOverlappedContracts"
        | "resourcesWithNoContractEndDate"
        | "resourcesArchivedWithActivatedIntranet"
        | "resourcesWithFollowedDocuments"
        | "opportunitiesWithNoAction"
        | "positioningsNotUpdated"
        | "projectsWithNoAction"
        | "projectsEndedUpcoming"
        | "projectsEndedUpcomingOrAlreadyEnded"
        | "projectsEndedToday"
        | "projectsEnded"
        | "deliveriesEndedUpcoming"
        | "deliveriesEndedToday"
        | "deliveriesEnded"
        | "deliveriesNotEntirelyCoveredByContracts"
        | "projectsWithNoOrderNotArchived"
        | "projectsWithSignedTurnoverGreaterThanOrderedTurnover"
        | "ordersWithNoBillingDetail"
        | "ordersWithNoDeliveryCorrelated"
        | "ordersWithInvoicedTurnoverGreaterThanOrderedTurnover"
        | "ordersWithSchedulesAmountDifferentFromOrderedTurnover"
        | "invoicesWithNoAction"
        | "invoicesWithDatesOfPaymentsUpcoming"
        | "invoicesWithDatesOfPaymentsIsToday"
        | "invoicesWithDatesOfPaymentsPast"
        | "schedulesPastWithNoInvoice";
      module?:
        | "actions"
        | "activityExpenses"
        | "candidates"
        | "resources"
        | "opportunities"
        | "positionings"
        | "projects"
        | "billing";
      params?: {
        perimeter?: string[];
        /**
         * Period for alert. Usually number of days for alert settings.
         */
        period?: number;
        X?: number[];
        Y?: number[];
        Z?: number[];
        U?: number[];
      };
    };
  }[];
}

/**
 * Alerts administrator settings
 */
export interface SchemasAlertsConfigurationJson {
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
    type: "alert";
    attributes?: {
      systemSettings?: {
        /**
         * Day number for weekly reporting
         */
        dayForWeeklyAlerts?: number;
        /**
         * Hour for weekly reporting
         */
        hourForWeeklyAlerts?: number;
        /**
         * Days number for daily reporting
         */
        daysForDailyAlerts?: unknown[];
        /**
         * Hour for daily reporting
         */
        hourForDailyAlerts?: unknown[];
      };
      alerts?: {
        id: string;
        module:
          | "actions"
          | "activityExpenses"
          | "candidates"
          | "resources"
          | "opportunities"
          | "positionings"
          | "projects"
          | "billing";
        indicator:
          | "actionsUpcoming"
          | "actionsOfTheDay"
          | "actionsLate"
          | "timesReportsWithNoValidation"
          | "expensesReportsWithNoValidation"
          | "absencesReportsWithNoValidation"
          | "candidatesWithNoAction"
          | "candidatesNotUpdated"
          | "resourcesWithNoAction"
          | "resourcesWithNoContracts"
          | "resourcesWithNoMoreContracts"
          | "resourcesProbationaryDateUpcoming"
          | "resourcesProbationaryDateToday"
          | "resourcesProbationaryDateTerminated"
          | "contractsEndedUpcoming"
          | "contractsEndedToday"
          | "contractsEnded"
          | "resourcesWithOverlappedContracts"
          | "resourcesWithNoContractEndDate"
          | "resourcesArchivedWithActivatedIntranet"
          | "resourcesWithFollowedDocuments"
          | "opportunitiesWithNoAction"
          | "positioningsNotUpdated"
          | "projectsWithNoAction"
          | "projectsEndedUpcoming"
          | "projectsEndedUpcomingOrAlreadyEnded"
          | "projectsEndedToday"
          | "projectsEnded"
          | "deliveriesEndedUpcoming"
          | "deliveriesEndedToday"
          | "deliveriesEnded"
          | "deliveriesNotEntirelyCoveredByContracts"
          | "projectsWithNoOrderNotArchived"
          | "projectsWithSignedTurnoverGreaterThanOrderedTurnover"
          | "ordersWithNoBillingDetail"
          | "ordersWithNoDeliveryCorrelated"
          | "ordersWithInvoicedTurnoverGreaterThanOrderedTurnover"
          | "ordersWithSchedulesAmountDifferentFromOrderedTurnover"
          | "invoicesWithNoAction"
          | "invoicesWithDatesOfPaymentsUpcoming"
          | "invoicesWithDatesOfPaymentsIsToday"
          | "invoicesWithDatesOfPaymentsPast"
          | "schedulesPastWithNoInvoice";
        /**
         * Alert sent on daily reporting ?
         */
        isDaily: boolean;
        /**
         * Alert sent on weekly reporting ?
         */
        isWeekly: boolean;
        /**
         * Current alert state
         */
        state: -1 | 0 | 1;
        params: {
          perimeter?: string[];
          /**
           * Period for alert. Usually number of days for alert settings.
           */
          period?: number;
          X?: number[];
          Y?: number[];
          Z?: number[];
          U?: number[];
        };
        /**
         * Current user can write alert ?
         */
        canWriteAlert: boolean;
      }[];
    };
  }[];
}

/**
 * Alerts administrator settings body put
 */
export interface SchemasAlertsConfigurationBodyPutJson {
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
    type: "alert";
    attributes?: {
      systemSettings?: {
        /**
         * Day number for weekly reporting
         */
        dayForWeeklyAlerts?: number;
        /**
         * Hour for weekly reporting
         */
        hourForWeeklyAlerts?: number;
        /**
         * Days number for daily reporting
         */
        daysForDailyAlerts?: unknown[];
        /**
         * Hour for daily reporting
         */
        hourForDailyAlerts?: unknown[];
      };
      alerts?: {
        id: string;
        module:
          | "actions"
          | "activityExpenses"
          | "candidates"
          | "resources"
          | "opportunities"
          | "positionings"
          | "projects"
          | "billing";
        indicator:
          | "actionsUpcoming"
          | "actionsOfTheDay"
          | "actionsLate"
          | "timesReportsWithNoValidation"
          | "expensesReportsWithNoValidation"
          | "absencesReportsWithNoValidation"
          | "candidatesWithNoAction"
          | "candidatesNotUpdated"
          | "resourcesWithNoAction"
          | "resourcesWithNoContracts"
          | "resourcesWithNoMoreContracts"
          | "resourcesProbationaryDateUpcoming"
          | "resourcesProbationaryDateToday"
          | "resourcesProbationaryDateTerminated"
          | "contractsEndedUpcoming"
          | "contractsEndedToday"
          | "contractsEnded"
          | "resourcesWithOverlappedContracts"
          | "resourcesWithNoContractEndDate"
          | "resourcesArchivedWithActivatedIntranet"
          | "resourcesWithFollowedDocuments"
          | "opportunitiesWithNoAction"
          | "positioningsNotUpdated"
          | "projectsWithNoAction"
          | "projectsEndedUpcoming"
          | "projectsEndedUpcomingOrAlreadyEnded"
          | "projectsEndedToday"
          | "projectsEnded"
          | "deliveriesEndedUpcoming"
          | "deliveriesEndedToday"
          | "deliveriesEnded"
          | "deliveriesNotEntirelyCoveredByContracts"
          | "projectsWithNoOrderNotArchived"
          | "projectsWithSignedTurnoverGreaterThanOrderedTurnover"
          | "ordersWithNoBillingDetail"
          | "ordersWithNoDeliveryCorrelated"
          | "ordersWithInvoicedTurnoverGreaterThanOrderedTurnover"
          | "ordersWithSchedulesAmountDifferentFromOrderedTurnover"
          | "invoicesWithNoAction"
          | "invoicesWithDatesOfPaymentsUpcoming"
          | "invoicesWithDatesOfPaymentsIsToday"
          | "invoicesWithDatesOfPaymentsPast"
          | "schedulesPastWithNoInvoice";
        /**
         * Alert sent on daily reporting ?
         */
        isDaily: boolean;
        /**
         * Alert sent on weekly reporting ?
         */
        isWeekly: boolean;
        /**
         * Current alert state
         */
        state: -1 | 0 | 1;
        params: {
          perimeter?: string[];
          /**
           * Period for alert. Usually number of days for alert settings.
           */
          period?: number;
          X?: number[];
          Y?: number[];
          Z?: number[];
          U?: number[];
        };
        /**
         * Current user can write alert ?
         */
        canWriteAlert: boolean;
      }[];
    };
  }[];
}

/**
 * Values for alert
 */
export interface SchemasAlertsValuesJson {
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
    type: "alert";
    attributes?: {
      indicator?:
        | "actionsUpcoming"
        | "actionsOfTheDay"
        | "actionsLate"
        | "timesReportsWithNoValidation"
        | "expensesReportsWithNoValidation"
        | "absencesReportsWithNoValidation"
        | "candidatesWithNoAction"
        | "candidatesNotUpdated"
        | "resourcesWithNoAction"
        | "resourcesWithNoContracts"
        | "resourcesWithNoMoreContracts"
        | "resourcesProbationaryDateUpcoming"
        | "resourcesProbationaryDateToday"
        | "resourcesProbationaryDateTerminated"
        | "contractsEndedUpcoming"
        | "contractsEndedToday"
        | "contractsEnded"
        | "resourcesWithOverlappedContracts"
        | "resourcesWithNoContractEndDate"
        | "resourcesArchivedWithActivatedIntranet"
        | "resourcesWithFollowedDocuments"
        | "opportunitiesWithNoAction"
        | "positioningsNotUpdated"
        | "projectsWithNoAction"
        | "projectsEndedUpcoming"
        | "projectsEndedUpcomingOrAlreadyEnded"
        | "projectsEndedToday"
        | "projectsEnded"
        | "deliveriesEndedUpcoming"
        | "deliveriesEndedToday"
        | "deliveriesEnded"
        | "deliveriesNotEntirelyCoveredByContracts"
        | "projectsWithNoOrderNotArchived"
        | "projectsWithSignedTurnoverGreaterThanOrderedTurnover"
        | "ordersWithNoBillingDetail"
        | "ordersWithNoDeliveryCorrelated"
        | "ordersWithInvoicedTurnoverGreaterThanOrderedTurnover"
        | "ordersWithSchedulesAmountDifferentFromOrderedTurnover"
        | "invoicesWithNoAction"
        | "invoicesWithDatesOfPaymentsUpcoming"
        | "invoicesWithDatesOfPaymentsIsToday"
        | "invoicesWithDatesOfPaymentsPast"
        | "schedulesPastWithNoInvoice";
      /**
       * User can read dependsOn values ?
       */
      canReadDependsOn?: boolean;
    };
    relationships?: {
      dependsOn?:
        | {
            data: {
              id: string;
              type: "action";
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
              type: "candidate";
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
              type: "contract";
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
              type: "positioning";
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
              type: "delivery";
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
              type: "providerinvoice";
            };
          };
    };
  }[];
  included?: (
    | {
        id: string;
        type: "action";
        attributes?: {
          startDate?: string;
          typeOf?: number;
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
        type: "candidate";
        attributes?: {
          lastName?: string;
          firstName?: string;
          thumbnail?: string;
        };
      }
    | {
        id: string;
        type: "resource";
        attributes?: {
          lastName?: string;
          firstName?: string;
          dateOfBirth?: string;
          thumbnail?: string;
        };
      }
    | {
        id: string;
        type: "product";
        attributes?: {
          name?: string;
        };
      }
    | {
        id: string;
        type: "contact";
        attributes?: {
          lastName?: string;
          firstName?: string;
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
        type: "opportunity";
        attributes?: {
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
        type: "order";
        attributes?: {
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
        type: "schedule";
        attributes?: {
          date?: string;
          title?: string;
        };
        relationships?: {
          /**
           * Schedule's order
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
        type: "timesreport";
        attributes?: {
          term?: string;
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
        };
      }
    | {
        id: string;
        type: "expensesreport";
        attributes?: {
          term?: string;
        };
        relationships?: {
          /**
           * Expenses's resource
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
        type: "absencesreport";
        attributes?: {
          creationDate?: string;
        };
        relationships?: {
          /**
           * Absences's resource
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
        type: "contract";
        attributes?: {
          typeOf?: number;
          startDate?: string;
          endDate?: string;
          probationEndDate?: string;
          renewalProbationEndDate?: string;
          /**
           * If false then contract is not accessible
           */
          canReadContract?: boolean;
        };
        relationships?: {
          /**
           * Contract's resource
           */
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
        type: "positioning";
        relationships?: {
          /**
           * Positioning's opportunity
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
              };
        };
      }
    | {
        id: string;
        type: "delivery";
        attributes?: {
          startDate?: string;
          endDate?: string;
        };
        relationships?: {
          /**
           * Delivery's project
           */
          project?: {
            data: {
              id: string;
              type: "project";
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
                  type: "product";
                };
              };
        };
      }
    | {
        id: string;
        type: "providerinvoice";
        attributes?: {
          invoiceDate?: string;
          reference?: string;
        };
        relationships?: {
          /**
           * Provider invoice's resource
           */
          resource?: {
            data: {
              id: string;
              type: "resource";
            };
          };
        };
      }
  )[];
}


// ─── bankingTransactions ───
/**
 * List of banking transactions
 */
export interface SchemasBankingTransactionsSearchJson {
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
    id?: string;
    type?: "bankingtransaction";
    attributes?: {
      amount?: {
        [k: string]: unknown;
      };
      currency?: number;
      date?: string;
      numberOfInvoices?: number;
      title?: string;
      state?: 0 | 1 | 2 | 3;
      totalAmountToReconcile?: {
        [k: string]: unknown;
      };
      canReadTransaction?: boolean;
      canWriteTransaction?: boolean;
      canReconcile?: boolean;
    };
    relationships?: {
      account?: {
        data?: {
          id?: string;
          type?: "bankingaccount";
        };
      };
    };
    required?: ["id", "type"];
    additionalProperties?: never;
  }[];
  included?: (
    | {
        id?: string;
        type?: "bankingaccount";
        attributes?: {
          name?: string;
          title?: string;
        };
        relationships?: {
          connection?: {
            data?: {
              id?: string;
              type?: string;
            };
          };
        };
      }
    | {
        id?: string;
        type?: "bankingconnection";
        attributes?: {
          bankName?: string;
        };
      }
  )[];
}

/**
 * Banking transaction's basic data
 */
export interface SchemasBankingTransactionsProfileJson {
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
    type: "bankingtransaction";
    attributes?: {
      amount?: {
        [k: string]: unknown;
      };
      currency?: number;
      date?: string;
      title?: string;
      exchangeRate?: number;
      state?: 0 | 1 | 2 | 3;
      /**
       * Invoice's payments list reconciliated with banking transaction
       */
      invoicePayments?: {
        id: string;
        /**
         * Payment creation date
         */
        createdAt: string;
        /**
         * Payment's amount including tax
         */
        amountIncludingTax: number;
        invoice?: {
          id?: string;
        };
      }[];
      numberOfInvoices?: number;
      totalAmountToReconcile?: {
        [k: string]: unknown;
      };
      canWriteTransaction?: boolean;
    };
    relationships?: {
      account?: {
        data?: {
          id?: string;
          type?: "bankingaccount";
        };
      };
    };
  };
  included?: (
    | {
        id?: string;
        type?: "bankingaccount";
        attributes?: {
          name?: string;
          title?: string;
        };
        relationships?: {
          connection?: {
            data?: {
              id?: string;
              type?: string;
            };
          };
        };
      }
    | {
        id?: string;
        type?: "bankingconnection";
        attributes?: {
          bankName?: string;
        };
      }
  )[];
}

/**
 * Update banking transaction
 */
export interface SchemasBankingTransactionsBodyPutJson {
  data: {
    state?: 0 | 1 | 2 | 3;
  };
}


// ─── targets ───
/**
 * Target's basic data
 */
export interface SchemasTargetsProfileJson {
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
    type: "target";
    attributes?: {
      category?: "commercial" | "humanResources" | "recruitment" | "activityExpenses" | "billing" | "global";
      operator?: "<" | "<=" | "=" | ">" | ">=";
      periodType?: "weekly" | "monthly" | "quaterly" | "semiAnnual" | "annual";
      periodNumber?: "allDates" | number;
      periodYear?: "allDates" | string;
      value?: number;
      scorecard?: {
        reference: {
          [k: string]: unknown;
        };
        typeOf: "money" | "percentage" | "number" | "string";
        dictionaryId?: number;
      };
    };
    relationships?: {
      /**
       * Target's resource
       */
      resource?: {
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
 * Target's basic data sent in the body with a POST method
 */
export interface SchemasTargetsBodyPostJson {
  data: {
    type: "target";
    attributes?: {
      category?: "commercial" | "humanResources" | "recruitment" | "activityExpenses" | "billing" | "global";
      operator?: "<" | "<=" | "=" | ">" | ">=";
      periodType?: "weekly" | "monthly" | "quaterly" | "semiAnnual" | "annual";
      periodNumber?: "allDates" | number;
      periodYear?: "allDates" | string;
      value?: number;
      scorecard?: {
        reference: {
          [k: string]: unknown;
        };
      };
    };
    relationships?: {
      /**
       * Target's resource
       */
      resource: {
        data: {
          id: string;
          type: "resource";
        };
      };
    };
  };
}

/**
 * Target's basic data sent in the body with a PUT method
 */
export interface SchemasTargetsBodyPutJson {
  data: {
    id: string;
    type: "target";
    attributes?: {
      category?: "commercial" | "humanResources" | "recruitment" | "activityExpenses" | "billing" | "global";
      operator?: "<" | "<=" | "=" | ">" | ">=";
      periodType?: "weekly" | "monthly" | "quaterly" | "semiAnnual" | "annual";
      periodNumber?: "allDates" | number;
      periodYear?: "allDates" | string;
      value?: number;
      scorecard?: {
        reference: {
          [k: string]: unknown;
        };
      };
    };
  };
}


// ─── marketplace ───
/**
 * List of marketplace's apps
 */
export interface SchemasMarketplaceSearchJson {
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
    type: "app";
    attributes?: {
      name?: string;
      isInstalled?: boolean;
      /**
       * Customer's absolute logo url
       */
      logo?: string;
      code?: string;
      integration?: "iFrame" | "module" | "moduleNoCode" | "sectionNoCode";
      website?: string;
      isValidated?: boolean;
      isPublic?: boolean;
      title?: string;
      description?: string;
    };
    relationships?: {
      /**
       * App's vendor
       */
      vendor?: {
        data: {
          id: string;
          type: "vendor";
        };
      };
    };
  }[];
  included?: {
    id: string;
    type: "vendor";
    attributes?: {
      name?: string;
      /**
       * Vendor's absolute logo url
       */
      logo?: string;
      isOwner?: boolean;
    };
  }[];
}

/**
 * App's basic data
 */
export interface SchemasMarketplaceProfileJson {
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
    type: "app";
    attributes?: {
      creationDate?: string;
      updateDate?: string;
      name?: string;
      title?: string;
      category?:
        | "other"
        | "mail"
        | "calendar"
        | "mailAndCalendar"
        | "certification"
        | "emailing"
        | "templates"
        | "ged"
        | "viewer";
      code?: string;
      key?: string;
      url?: string;
      integration?: "iFrame" | "module" | "moduleNoCode" | "sectionNoCode";
      website?: string;
      testimoniesUrl?: string;
      termsOfUseUrl?: string;
      description?: string;
      price?: string;
      /**
       * Customer's absolute logo url
       */
      logo?: string;
      isPublic?: boolean;
      tokenSecurity?: "permanent" | "temporary";
      isRefreshTokenValidated?: boolean;
      isValidated?: boolean;
      isInstalled?: boolean;
      isBoondManagerApp?: boolean;
      hasConfigurationPage?: boolean;
      /**
       * List of APIs allowed
       */
      apisAllowed?: {
        page:
          | "application/dictionary"
          | "application/perimeters"
          | "application/flags"
          | "application/assignments"
          | "purchases"
          | "payments"
          | "actions"
          | "opportunities"
          | "candidates"
          | "absencesReports"
          | "expensesReports"
          | "timesReports"
          | "invoices"
          | "orders"
          | "billing-deliveries-purchases-balance"
          | "billing-monthly-schedule"
          | "billing-projects-balance"
          | "billing-schedules-balance"
          | "contacts"
          | "companies"
          | "positionings"
          | "products"
          | "projects"
          | "deliveries-inactivities-groupments"
          | "resources"
          | "accounts"
          | "dashboard"
          | "accounts/(id}"
          | "resources/@id"
          | "resources/@id/information"
          | "resources/@id/administrative"
          | "resources/@id/technical-data"
          | "resources/@id/actions"
          | "resources/@id/positionings"
          | "resources/@id/deliveries"
          | "resources/@id/times-reports"
          | "resources/@id/expenses-reports"
          | "resources/@id/absences-reports"
          | "resources/@id/absences-accounts"
          | "candidates/@id"
          | "candidates/@id/information"
          | "candidates/@id/administrative"
          | "candidates/@id/technical-data"
          | "candidates/@id/actions"
          | "candidates/@id/positionings"
          | "contacts/@id"
          | "contacts/@id/information"
          | "contacts/@id/actions"
          | "contacts/@id/opportunities"
          | "contacts/@id/projects"
          | "contacts/@id/purchases"
          | "contacts/@id/orders"
          | "contacts/@id/invoices"
          | "companies/@id"
          | "companies/@id/information"
          | "companies/@id/contacts"
          | "companies/@id/actions"
          | "companies/@id/opportunities"
          | "companies/@id/projects"
          | "companies/@id/purchases"
          | "companies/@id/orders"
          | "companies/@id/invoices"
          | "opportunities/@id"
          | "opportunities/@id/information"
          | "opportunities/@id/positionings"
          | "opportunities/@id/actions"
          | "absencesReports/@id"
          | "invoices/@id"
          | "invoices/@id/information"
          | "invoices/@id/actions"
          | "timesReports/@id"
          | "expensesReports/@id"
          | "deliveries/@id"
          | "groupments/@id"
          | "inactivities/@id"
          | "products/@id"
          | "products/@id/information"
          | "products/@id/actions"
          | "products/@id/opportunities"
          | "products/@id/projects"
          | "projects/@id"
          | "projects/@id/information"
          | "projects/@id/batches-markers"
          | "projects/@id/actions"
          | "projects/@id/deliveries"
          | "projects/@id/advantages"
          | "projects/@id/purchases"
          | "projects/@id/productivity"
          | "projects/@id/orders"
          | "purchases/@id"
          | "purchases/@id/information"
          | "purchases/@id/payments"
          | "purchases/@id/actions"
          | "purchases/@id/projects"
          | "payments/@id"
          | "positionings/@id"
          | "actions/@id"
          | "advantages/@id"
          | "orders/@id"
          | "orders/@id/information"
          | "orders/@id/invoices"
          | "orders/@id/actions"
          | "contracts/@id"
          | "technical-datas"
          | "technical-datas/@id";
        event: "read" | "create" | "update" | "delete";
      }[];
      /**
       * List of customers codes
       */
      customersAllowed?: string[];
      /**
       * List of IPs
       */
      hostsAllowed?: string[];
      /**
       * List of buttons
       */
      buttonsSetting?: {
        page:
          | "resources/@id"
          | "resources/@id/information"
          | "resources/@id/administrative"
          | "resources/@id/technical-data"
          | "resources/@id/actions"
          | "resources/@id/positionings"
          | "resources/@id/deliveries-inactivities"
          | "resources/@id/times-reports"
          | "resources/@id/expenses-reports"
          | "resources/@id/absences-reports"
          | "resources/@id/absences-accounts"
          | "candidates/@id"
          | "candidates/@id/information"
          | "candidates/@id/administrative"
          | "candidates/@id/technical-data"
          | "candidates/@id/actions"
          | "candidates/@id/positionings"
          | "contacts/@id"
          | "contacts/@id/information"
          | "contacts/@id/actions"
          | "contacts/@id/opportunities"
          | "contacts/@id/projects"
          | "contacts/@id/purchases"
          | "contacts/@id/orders"
          | "contacts/@id/invoices"
          | "companies/@id"
          | "companies/@id/information"
          | "companies/@id/contacts"
          | "companies/@id/actions"
          | "companies/@id/opportunities"
          | "companies/@id/projects"
          | "companies/@id/purchases"
          | "companies/@id/orders"
          | "companies/@id/invoices"
          | "opportunities/@id"
          | "opportunities/@id/information"
          | "opportunities/@id/positionings"
          | "opportunities/@id/actions"
          | "absences-reports/@id"
          | "invoices/@id"
          | "invoices/@id/information"
          | "invoices/@id/actions"
          | "times-reports/@id"
          | "expenses-reports/@id"
          | "deliveries/@id"
          | "groupments/@id"
          | "inactivities/@id"
          | "products/@id"
          | "products/@id/information"
          | "products/@id/actions"
          | "products/@id/opportunities"
          | "products/@id/projects"
          | "projects/@id"
          | "projects/@id/information"
          | "projects/@id/batches-markers"
          | "projects/@id/actions"
          | "projects/@id/deliveries-groupments"
          | "projects/@id/advantages"
          | "projects/@id/purchases"
          | "projects/@id/productivity"
          | "projects/@id/orders"
          | "purchases/@id"
          | "purchases/@id/information"
          | "purchases/@id/payments"
          | "purchases/@id/actions"
          | "purchases/@id/projects"
          | "payments/@id"
          | "positionings/@id"
          | "actions/@id"
          | "advantages/@id"
          | "orders/@id"
          | "orders/@id/information"
          | "orders/@id/invoices"
          | "orders/@id/actions"
          | "contracts/@id"
          | "purchases"
          | "payments"
          | "actions"
          | "opportunities"
          | "candidates"
          | "absences-reports"
          | "expenses-reports"
          | "times-reports"
          | "invoices"
          | "orders"
          | "billing-deliveries-purchases-balance"
          | "billing-monthly-schedule"
          | "billing-projects-balance"
          | "billing-schedules-balance"
          | "contacts"
          | "companies"
          | "positionings"
          | "products"
          | "projects"
          | "deliveries-inactivities-groupments"
          | "resources";
        title: string;
        function: string;
      }[];
      /**
       * List of iFrames
       */
      iFramesSetting?: {
        page:
          | "dashboard"
          | "resources/@id"
          | "resources/@id/information"
          | "resources/@id/administrative"
          | "resources/@id/technical-data"
          | "resources/@id/actions"
          | "resources/@id/positionings"
          | "resources/@id/deliveries"
          | "resources/@id/times-reports"
          | "resources/@id/expenses-reports"
          | "resources/@id/absences-reports"
          | "resources/@id/absences-accounts"
          | "candidates/@id"
          | "candidates/@id/information"
          | "candidates/@id/administrative"
          | "candidates/@id/technical-data"
          | "candidates/@id/actions"
          | "candidates/@id/positionings"
          | "contacts/@id"
          | "contacts/@id/information"
          | "contacts/@id/actions"
          | "contacts/@id/opportunities"
          | "contacts/@id/projects"
          | "contacts/@id/purchases"
          | "contacts/@id/orders"
          | "contacts/@id/invoices"
          | "companies/@id"
          | "companies/@id/information"
          | "companies/@id/contacts"
          | "companies/@id/actions"
          | "companies/@id/opportunities"
          | "companies/@id/projects"
          | "companies/@id/purchases"
          | "companies/@id/orders"
          | "companies/@id/invoices"
          | "opportunities/@id"
          | "opportunities/@id/information"
          | "opportunities/@id/positionings"
          | "opportunities/@id/actions"
          | "absencesReports/@id"
          | "invoices/@id"
          | "invoices/@id/information"
          | "invoices/@id/actions"
          | "times-reports/@id"
          | "expenses-reports/@id"
          | "deliveries/@id"
          | "groupments/@id"
          | "inactivities/@id"
          | "products/@id"
          | "products/@id/information"
          | "products/@id/actions"
          | "products/@id/opportunities"
          | "products/@id/projects"
          | "projects/@id"
          | "projects/@id/information"
          | "projects/@id/batches-markers"
          | "projects/@id/actions"
          | "projects/@id/deliveries"
          | "projects/@id/advantages"
          | "projects/@id/purchases"
          | "projects/@id/productivity"
          | "projects/@id/orders"
          | "purchases/@id"
          | "purchases/@id/information"
          | "purchases/@id/payments"
          | "purchases/@id/actions"
          | "purchases/@id/projects"
          | "payments/@id"
          | "positionings/@id"
          | "actions/@id"
          | "advantages/@id"
          | "orders/@id"
          | "orders/@id/information"
          | "orders/@id/invoices"
          | "orders/@id/actions"
          | "contracts/@id";
        scrolling: boolean;
        height: number;
        isHalfWidth: boolean;
        function: string;
      }[];
      /**
       * List of triggers
       */
      triggersSetting?: {
        page:
          | "actions/@id"
          | "candidates/@id"
          | "resources/@id"
          | "products/@id"
          | "contracts/@id"
          | "advantages/@id"
          | "opportunities/@id"
          | "projects/@id"
          | "positionings/@id"
          | "deliveries/@id"
          | "groupments/@id"
          | "inactivities/@id"
          | "times-reports/@id"
          | "expenses-reports/@id"
          | "absences-reports/@id"
          | "purchases/@id"
          | "payments/@id"
          | "orders/@id"
          | "invoices/@id"
          | "contacts/@id"
          | "companies/@id";
        event: "create" | "update" | "delete";
        function: string;
      }[];
      /**
       * List of widgets
       */
      widgetsSetting?: {
        page?: "topBar" | "bottomLeft" | "bottomRight";
        function: string;
      }[];
      /**
       * List of models
       */
      allowedModels?: string[];
      /**
       * List of features that will be added in allow attribute for iframe tag
       */
      allowedIframeFeatures?: string[];
      visibility?: "allowedManagers" | "allManagers" | "allowedManagersAndResources" | "allManagersAndResources";
      /**
       * Parent module for fields & applications customized
       */
      module?:
        | ""
        | "resources"
        | "candidates"
        | "opportunities"
        | "products"
        | "companies"
        | "contacts"
        | "projects"
        | "pruchases"
        | "orders"
        | "invoices";
      /**
       * Tab for sections customized
       */
      tab?: "information" | "administrative" | "technicalData";
      allowGuestsValidation?: boolean;
      allowManagersValidation?: boolean;
      allowAccessToMyProfile?: boolean;
      actionTypeOf?: number;
      allowEntitiesAction?: "" | "created" | "mainManagerValidated" | "guestsValidated" | "allValidated";
      /**
       * List of fields to show in the parent's tab
       */
      defaultColumnsForParent?: string[];
      /**
       * List of fields to show in the search's view
       */
      defaultColumnsForSearch?: string[];
      sharingMailObject?: string;
      sharingMailBody?: string;
      validatedMailObject?: string;
      validatedMailBody?: string;
      /**
       * List of sections of fields & applications customized
       */
      sections?: {
        id: string;
        title: string;
        col: number;
        row: number;
        span: number;
        showUpdateDate: boolean;
        /**
         * List of fields
         */
        fields: {
          id: string;
          title?: string;
          placeholder?: string;
          suffix?: string;
          options?: unknown[];
          settings: {
            maxLenth?: number;
            required?: boolean;
            multiple?: boolean;
            readOnly?: boolean;
            noTitle?: boolean;
            maxFiles?: number;
            precision?: number;
            hasMin?: boolean;
            min?: number;
            hasMax?: boolean;
            max?: number;
            optionColors?: unknown[];
            optionsIsEnabled?: unknown[];
            displayNumberSelected?: boolean;
            defaultValue?:
              | boolean
              | number
              | (
                  | "veryGood"
                  | "good"
                  | "bad"
                  | "veryBad"
                  | "fromParent"
                  | "fromParentMainManager"
                  | "fromParentHrManager"
                  | "fromCurrentUser"
                  | "fromParentAgency"
                  | "fromParentPole"
                  | "fromCurrentUserAgency"
                  | "fromCurrentUserPole"
                )
              | unknown[];
            module?:
              | "resources"
              | "candidates"
              | "contacts"
              | "companies"
              | "products"
              | "opportunities"
              | "projects"
              | "purchases";
            alertType?: "info" | "warning" | "danger";
            url?: string;
            scrolling?: boolean;
            height?: number;
            asReference?: boolean;
            owner?: boolean;
            nonOwnerCanReadAnswer?: boolean;
            canBeSearched?: boolean;
          };
          typeOf?:
            | "barometer"
            | "select"
            | "textarea"
            | "html"
            | "text"
            | "currency"
            | "files"
            | "float"
            | "int"
            | "bool"
            | "parent"
            | "mainManager"
            | "pole"
            | "agency"
            | "guests"
            | "visibility"
            | "money"
            | "state"
            | "typeOf"
            | "tools"
            | "mobilityAreas"
            | "activityAreas"
            | "expertiseArea"
            | "alert"
            | "address"
            | "email"
            | "phone"
            | "iFrame"
            | "date"
            | "datetime"
            | "period"
            | "periodtime"
            | "nationality"
            | "country";
          col: number;
          row: number;
          span: number;
        }[];
      }[];
    };
    relationships?: {
      /**
       * App's vendor
       */
      vendor?: {
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
    };
  };
  included?: (
    | {
        id: string;
        type: "vendor";
        attributes?: {
          name?: string;
          email1?: string;
          phone1?: string;
          address?: string;
          postcode?: string;
          town?: string;
          country?: string;
          website?: string;
          isOwner?: boolean;
        };
        relationships?: {
          /**
           * Vendor's customer
           */
          customer?: {
            data?: {
              id?: string;
              code?: string;
            };
          };
        };
      }
    | {
        id?: string;
        type?: "customer";
        attributes?: {
          code?: string;
        };
      }
  )[];
}

/**
 * Empty app's default basic data
 */
export interface SchemasMarketplaceDefaultJson {
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
    id: "0";
    type: "action";
    attributes?: {
      category?:
        | "other"
        | "mail"
        | "calendar"
        | "mailAndCalendar"
        | "certification"
        | "emailing"
        | "templates"
        | "ged"
        | "viewer";
      isPublic?: boolean;
      tokenSecurity?: "permanent" | "temporary";
      integration?: "iFrame" | "module" | "moduleNoCode" | "sectionNoCode";
      isValidated?: boolean;
      isInstalled?: boolean;
      hasConfigurationPage?: boolean;
      isBoondManagerApp?: boolean;
      /**
       * Parent module for fields & applications customized
       */
      module?:
        | ""
        | "resources"
        | "candidates"
        | "opportunities"
        | "products"
        | "companies"
        | "contacts"
        | "projects"
        | "pruchases"
        | "orders"
        | "invoices";
      /**
       * Tab for sections customized
       */
      tab?: "information" | "administrative" | "technicalData";
      allowGuestsValidation?: boolean;
      allowManagersValidation?: boolean;
      allowAccessToMyProfile?: boolean;
      actionTypeOf?: number;
      allowEntitiesAction?: "" | "created" | "mainManagerValidated" | "guestsValidated" | "allValidated";
      /**
       * List of fields to show in the parent's tab
       */
      defaultColumnsForParent?: string[];
      /**
       * List of fields to show in the search's view
       */
      defaultColumnsForSearch?: string[];
      sharingMailObject?: string;
      sharingMailBody?: string;
      validatedMailObject?: string;
      validatedMailBody?: string;
    };
    relationships?: {
      /**
       * App's vendor
       */
      vendor?: {
        data: {
          id: string;
          type: "resource";
        };
      };
    };
  };
  included?: (
    | {
        id: string;
        type: "vendor";
        attributes?: {
          name?: string;
          email1?: string;
          phone1?: string;
          address?: string;
          postcode?: string;
          town?: string;
          country?: string;
          website?: string;
        };
      }
    | {
        id?: string;
        type?: "customer";
      }
  )[];
}

/**
 * App's rights
 */
export interface SchemasMarketplaceRightsJson {
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
        install?: boolean;
        /**
         * true if this action is available
         */
        uninstall?: boolean;
        /**
         * true if this action is available
         */
        edit?: boolean;
        /**
         * true if this action is available
         */
        publish?: boolean;
        /**
         * true if this action is available
         */
        configure?: boolean;
        /**
         * true if this action is available
         */
        usersAccess?: boolean;
        /**
         * true if this action is available
         */
        delete?: boolean;
        /**
         * true if this action is available
         */
        seeLogs?: boolean;
        /**
         * true if this action is available
         */
        validate?: boolean;
        /**
         * true if this action is available
         */
        resetToken?: boolean;
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
        translations?: {
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
        name?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        key?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        title?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        category?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        website?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        testimoniesUrl?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        termsOfUseUrl?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        price?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        creationDate?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        code?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        isPublic?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        isValidated?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        url?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        integration?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        hasConfigurationPage?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        apisAllowed?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        hostsAllowed?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        customersAllowed?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        buttonsSetting?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        iFramesSetting?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        triggersSetting?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        widgetsSetting?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        allowedModels?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        allowedIframeFeatures?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        logo?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        tokenSecurity?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        description?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        translations?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        module?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        tab?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        sections?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        allowGuestsValidation?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        allowManagersValidation?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        allowAccessToMyProfile?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        allowEntitiesAction?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        actionTypeOf?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        defaultColumnsForParent?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        defaultColumnsForSearch?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        sharingMailObject?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        sharingMailBody?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        validatedMailObject?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        validatedMailBody?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        updateDate?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        createdBy?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        installUrl?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        uninstallUrl?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        redirectUris?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        oauth2Enabled?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        accessTokens?: {
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
 * Specific translations
 */
export interface SchemasMarketplaceTranslationsJson {
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
    appSetting?: {
      name?: string;
      title?: string;
      description?: string;
      price?: string;
      sharingMailObject?: string;
      sharingMailBody?: string;
      validatedMailObject?: string;
      validatedMailBody?: string;
      sections?: {
        id: string;
        title: string;
        fields?: {
          id: string;
          title?: string;
          placeholder?: string;
          suffix?: string;
          options?: unknown[];
        }[];
      }[];
    };
  };
}

/**
 * App's access
 */
export interface SchemasMarketplaceConfigureJson {
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
    type: "app";
    attributes?: {
      name?: string;
      visibility?: "allowedManagers" | "allManagers" | "allowedManagersAndResources" | "allManagersAndResources";
    };
  };
}

/**
 * App's basic data sent in the body with a POST method
 */
export interface SchemasMarketplaceBodyPostJson {
  data: {
    type: "app";
    attributes: {
      name: string;
      title?: string;
      category?:
        | "other"
        | "mail"
        | "calendar"
        | "mailAndCalendar"
        | "certification"
        | "emailing"
        | "templates"
        | "ged"
        | "viewer";
      code: string;
      url?: string;
      website?: string;
      testimoniesUrl?: string;
      termsOfUseUrl?: string;
      description?: string;
      price?: string;
      /**
       * Customer's absolute logo url
       */
      logo?: string;
      isPublic?: boolean;
      tokenSecurity?: "permanent" | "temporary";
      isValidated?: boolean;
      hasConfigurationPage?: boolean;
      /**
       * List of APIs allowed
       */
      apisAllowed?: {
        page:
          | "application/dictionary"
          | "application/perimeters"
          | "application/flags"
          | "application/assignments"
          | "purchases"
          | "payments"
          | "actions"
          | "opportunities"
          | "candidates"
          | "absencesReports"
          | "expensesReports"
          | "timesReports"
          | "invoices"
          | "orders"
          | "billing-deliveries-purchases-balance"
          | "billing-monthly-schedule"
          | "billing-projects-balance"
          | "billing-schedules-balance"
          | "contacts"
          | "companies"
          | "positionings"
          | "products"
          | "projects"
          | "deliveries-inactivities-groupments"
          | "resources"
          | "accounts"
          | "dashboard"
          | "accounts/(id}"
          | "resources/@id"
          | "resources/@id/information"
          | "resources/@id/administrative"
          | "resources/@id/technical-data"
          | "resources/@id/actions"
          | "resources/@id/positionings"
          | "resources/@id/deliveries"
          | "resources/@id/times-reports"
          | "resources/@id/expenses-reports"
          | "resources/@id/absences-reports"
          | "resources/@id/absences-accounts"
          | "candidates/@id"
          | "candidates/@id/information"
          | "candidates/@id/administrative"
          | "candidates/@id/technical-data"
          | "candidates/@id/actions"
          | "candidates/@id/positionings"
          | "contacts/@id"
          | "contacts/@id/information"
          | "contacts/@id/actions"
          | "contacts/@id/opportunities"
          | "contacts/@id/projects"
          | "contacts/@id/purchases"
          | "contacts/@id/orders"
          | "contacts/@id/invoices"
          | "companies/@id"
          | "companies/@id/information"
          | "companies/@id/contacts"
          | "companies/@id/actions"
          | "companies/@id/opportunities"
          | "companies/@id/projects"
          | "companies/@id/purchases"
          | "companies/@id/orders"
          | "companies/@id/invoices"
          | "opportunities/@id"
          | "opportunities/@id/information"
          | "opportunities/@id/positionings"
          | "opportunities/@id/actions"
          | "absencesReports/@id"
          | "invoices/@id"
          | "invoices/@id/information"
          | "invoices/@id/actions"
          | "timesReports/@id"
          | "expensesReports/@id"
          | "deliveries/@id"
          | "groupments/@id"
          | "inactivities/@id"
          | "products/@id"
          | "products/@id/information"
          | "products/@id/actions"
          | "products/@id/opportunities"
          | "products/@id/projects"
          | "projects/@id"
          | "projects/@id/information"
          | "projects/@id/batches-markers"
          | "projects/@id/actions"
          | "projects/@id/deliveries"
          | "projects/@id/advantages"
          | "projects/@id/purchases"
          | "projects/@id/productivity"
          | "projects/@id/orders"
          | "purchases/@id"
          | "purchases/@id/information"
          | "purchases/@id/payments"
          | "purchases/@id/actions"
          | "purchases/@id/projects"
          | "payments/@id"
          | "positionings/@id"
          | "actions/@id"
          | "advantages/@id"
          | "orders/@id"
          | "orders/@id/information"
          | "orders/@id/invoices"
          | "orders/@id/actions"
          | "contracts/@id"
          | "technical-datas"
          | "technical-datas/@id";
        event: "read" | "create" | "update" | "delete";
      }[];
      /**
       * List of customers codes
       */
      customersAllowed?: string[];
      /**
       * List of IPs
       */
      hostsAllowed?: string[];
      /**
       * List of buttons
       */
      buttonsSetting?: {
        page:
          | "resources/@id"
          | "resources/@id/information"
          | "resources/@id/administrative"
          | "resources/@id/technical-data"
          | "resources/@id/actions"
          | "resources/@id/positionings"
          | "resources/@id/deliveries-inactivities"
          | "resources/@id/times-reports"
          | "resources/@id/expenses-reports"
          | "resources/@id/absences-reports"
          | "resources/@id/absences-accounts"
          | "candidates/@id"
          | "candidates/@id/information"
          | "candidates/@id/administrative"
          | "candidates/@id/technical-data"
          | "candidates/@id/actions"
          | "candidates/@id/positionings"
          | "contacts/@id"
          | "contacts/@id/information"
          | "contacts/@id/actions"
          | "contacts/@id/opportunities"
          | "contacts/@id/projects"
          | "contacts/@id/purchases"
          | "contacts/@id/orders"
          | "contacts/@id/invoices"
          | "companies/@id"
          | "companies/@id/information"
          | "companies/@id/contacts"
          | "companies/@id/actions"
          | "companies/@id/opportunities"
          | "companies/@id/projects"
          | "companies/@id/purchases"
          | "companies/@id/orders"
          | "companies/@id/invoices"
          | "opportunities/@id"
          | "opportunities/@id/information"
          | "opportunities/@id/positionings"
          | "opportunities/@id/actions"
          | "absences-reports/@id"
          | "invoices/@id"
          | "invoices/@id/information"
          | "invoices/@id/actions"
          | "times-reports/@id"
          | "expenses-reports/@id"
          | "deliveries/@id"
          | "groupments/@id"
          | "inactivities/@id"
          | "products/@id"
          | "products/@id/information"
          | "products/@id/actions"
          | "products/@id/opportunities"
          | "products/@id/projects"
          | "projects/@id"
          | "projects/@id/information"
          | "projects/@id/batches-markers"
          | "projects/@id/actions"
          | "projects/@id/deliveries-groupments"
          | "projects/@id/advantages"
          | "projects/@id/purchases"
          | "projects/@id/productivity"
          | "projects/@id/orders"
          | "purchases/@id"
          | "purchases/@id/information"
          | "purchases/@id/payments"
          | "purchases/@id/actions"
          | "purchases/@id/projects"
          | "payments/@id"
          | "positionings/@id"
          | "actions/@id"
          | "advantages/@id"
          | "orders/@id"
          | "orders/@id/information"
          | "orders/@id/invoices"
          | "orders/@id/actions"
          | "contracts/@id"
          | "purchases"
          | "payments"
          | "actions"
          | "opportunities"
          | "candidates"
          | "absences-reports"
          | "expenses-reports"
          | "times-reports"
          | "invoices"
          | "orders"
          | "billing-deliveries-purchases-balance"
          | "billing-monthly-schedule"
          | "billing-projects-balance"
          | "billing-schedules-balance"
          | "contacts"
          | "companies"
          | "positionings"
          | "products"
          | "projects"
          | "deliveries-inactivities-groupments"
          | "resources";
        title: string;
        function: string;
      }[];
      /**
       * List of iFrames
       */
      iFramesSetting?: {
        page:
          | "dashboard"
          | "resources/@id"
          | "resources/@id/information"
          | "resources/@id/administrative"
          | "resources/@id/technical-data"
          | "resources/@id/actions"
          | "resources/@id/positionings"
          | "resources/@id/deliveries"
          | "resources/@id/times-reports"
          | "resources/@id/expenses-reports"
          | "resources/@id/absences-reports"
          | "resources/@id/absences-accounts"
          | "candidates/@id"
          | "candidates/@id/information"
          | "candidates/@id/administrative"
          | "candidates/@id/technical-data"
          | "candidates/@id/actions"
          | "candidates/@id/positionings"
          | "contacts/@id"
          | "contacts/@id/information"
          | "contacts/@id/actions"
          | "contacts/@id/opportunities"
          | "contacts/@id/projects"
          | "contacts/@id/purchases"
          | "contacts/@id/orders"
          | "contacts/@id/invoices"
          | "companies/@id"
          | "companies/@id/information"
          | "companies/@id/contacts"
          | "companies/@id/actions"
          | "companies/@id/opportunities"
          | "companies/@id/projects"
          | "companies/@id/purchases"
          | "companies/@id/orders"
          | "companies/@id/invoices"
          | "opportunities/@id"
          | "opportunities/@id/information"
          | "opportunities/@id/positionings"
          | "opportunities/@id/actions"
          | "absencesReports/@id"
          | "invoices/@id"
          | "invoices/@id/information"
          | "invoices/@id/actions"
          | "times-reports/@id"
          | "expenses-reports/@id"
          | "deliveries/@id"
          | "groupments/@id"
          | "inactivities/@id"
          | "products/@id"
          | "products/@id/information"
          | "products/@id/actions"
          | "products/@id/opportunities"
          | "products/@id/projects"
          | "projects/@id"
          | "projects/@id/information"
          | "projects/@id/batches-markers"
          | "projects/@id/actions"
          | "projects/@id/deliveries"
          | "projects/@id/advantages"
          | "projects/@id/purchases"
          | "projects/@id/productivity"
          | "projects/@id/orders"
          | "purchases/@id"
          | "purchases/@id/information"
          | "purchases/@id/payments"
          | "purchases/@id/actions"
          | "purchases/@id/projects"
          | "payments/@id"
          | "positionings/@id"
          | "actions/@id"
          | "advantages/@id"
          | "orders/@id"
          | "orders/@id/information"
          | "orders/@id/invoices"
          | "orders/@id/actions"
          | "contracts/@id";
        scrolling: boolean;
        height: number;
        isHalfWidth: boolean;
        function: string;
      }[];
      /**
       * List of triggers
       */
      triggersSetting?: {
        page:
          | "actions/@id"
          | "candidates/@id"
          | "resources/@id"
          | "products/@id"
          | "contracts/@id"
          | "advantages/@id"
          | "opportunities/@id"
          | "projects/@id"
          | "positionings/@id"
          | "deliveries/@id"
          | "groupments/@id"
          | "inactivities/@id"
          | "times-reports/@id"
          | "expenses-reports/@id"
          | "absences-reports/@id"
          | "purchases/@id"
          | "payments/@id"
          | "orders/@id"
          | "invoices/@id"
          | "contacts/@id"
          | "companies/@id";
        event: "create" | "update" | "delete";
        function: string;
      }[];
      /**
       * List of widgets
       */
      widgetsSetting?: {
        page?: "topBar" | "bottomLeft" | "bottomRight";
        function: string;
      }[];
      /**
       * List of models
       */
      allowedModels?: string[];
      /**
       * List of features that will be added in allow attribute for iframe tag
       */
      allowedIframeFeatures?: string[];
      /**
       * Parent module for fields & applications customized
       */
      module?:
        | ""
        | "resources"
        | "candidates"
        | "opportunities"
        | "products"
        | "companies"
        | "contacts"
        | "projects"
        | "pruchases"
        | "orders"
        | "invoices";
      /**
       * Tab for sections customized
       */
      tab?: "information" | "administrative" | "technicalData";
      allowGuestsValidation?: boolean;
      allowManagersValidation?: boolean;
      allowAccessToMyProfile?: boolean;
      actionTypeOf?: number;
      allowEntitiesAction?: "" | "created" | "mainManagerValidated" | "guestsValidated" | "allValidated";
      /**
       * List of fields to show in the parent's tab
       */
      defaultColumnsForParent?: string[];
      /**
       * List of fields to show in the search's view
       */
      defaultColumnsForSearch?: string[];
      sharingMailObject?: string;
      sharingMailBody?: string;
      validatedMailObject?: string;
      validatedMailBody?: string;
      /**
       * List of sections of fields & applications customized
       */
      sections?: (
        | {
            title: string;
            col: number;
            row: number;
            span: number;
            showUpdateDate: boolean;
            /**
             * List of fields
             */
            fields: {
              title?: string;
              placeholder?: string;
              suffix?: string;
              options?: unknown[];
              settings: {
                maxLenth?: number;
                required?: boolean;
                multiple?: boolean;
                readOnly?: boolean;
                noTitle?: boolean;
                maxFiles?: number;
                precision?: number;
                hasMin?: boolean;
                min?: number;
                hasMax?: boolean;
                max?: number;
                optionColors?: unknown[];
                optionsIsEnabled?: unknown[];
                displayNumberSelected?: boolean;
                defaultValue?:
                  | boolean
                  | number
                  | (
                      | "veryGood"
                      | "good"
                      | "bad"
                      | "veryBad"
                      | "fromParent"
                      | "fromParentMainManager"
                      | "fromParentHrManager"
                      | "fromCurrentUser"
                      | "fromParentAgency"
                      | "fromParentPole"
                      | "fromCurrentUserAgency"
                      | "fromCurrentUserPole"
                    )
                  | unknown[];
                module?:
                  | "resources"
                  | "candidates"
                  | "contacts"
                  | "companies"
                  | "products"
                  | "opportunities"
                  | "projects"
                  | "purchases";
                alertType?: "info" | "warning" | "danger";
                url?: string;
                scrolling?: boolean;
                height?: number;
                asReference?: boolean;
                owner?: boolean;
                nonOwnerCanReadAnswer?: boolean;
                canBeSearched?: boolean;
              };
              typeOf?:
                | "barometer"
                | "select"
                | "textarea"
                | "html"
                | "text"
                | "currency"
                | "files"
                | "float"
                | "int"
                | "bool"
                | "parent"
                | "mainManager"
                | "pole"
                | "agency"
                | "guests"
                | "visibility"
                | "money"
                | "state"
                | "typeOf"
                | "tools"
                | "mobilityAreas"
                | "activityAreas"
                | "expertiseArea"
                | "alert"
                | "address"
                | "email"
                | "phone"
                | "iFrame"
                | "date"
                | "datetime"
                | "period"
                | "periodtime"
                | "nationality"
                | "country";
              col: number;
              row: number;
              span: number;
            }[];
          }
        | {
            id: string;
            title: string;
            col: number;
            row: number;
            span: number;
            showUpdateDate: boolean;
            /**
             * List of fields
             */
            fields: (
              | {
                  title?: string;
                  placeholder?: string;
                  suffix?: string;
                  options?: unknown[];
                  settings: {
                    maxLenth?: number;
                    required?: boolean;
                    multiple?: boolean;
                    readOnly?: boolean;
                    noTitle?: boolean;
                    maxFiles?: number;
                    precision?: number;
                    hasMin?: boolean;
                    min?: number;
                    hasMax?: boolean;
                    max?: number;
                    optionColors?: unknown[];
                    optionsIsEnabled?: unknown[];
                    displayNumberSelected?: boolean;
                    defaultValue?:
                      | boolean
                      | number
                      | (
                          | "veryGood"
                          | "good"
                          | "bad"
                          | "veryBad"
                          | "fromParent"
                          | "fromParentMainManager"
                          | "fromParentHrManager"
                          | "fromCurrentUser"
                          | "fromParentAgency"
                          | "fromParentPole"
                          | "fromCurrentUserAgency"
                          | "fromCurrentUserPole"
                        )
                      | unknown[];
                    module?:
                      | "resources"
                      | "candidates"
                      | "contacts"
                      | "companies"
                      | "products"
                      | "opportunities"
                      | "projects"
                      | "purchases";
                    alertType?: "info" | "warning" | "danger";
                    url?: string;
                    scrolling?: boolean;
                    height?: number;
                    asReference?: boolean;
                    owner?: boolean;
                    nonOwnerCanReadAnswer?: boolean;
                    canBeSearched?: boolean;
                  };
                  typeOf?:
                    | "barometer"
                    | "select"
                    | "textarea"
                    | "html"
                    | "text"
                    | "currency"
                    | "files"
                    | "float"
                    | "int"
                    | "bool"
                    | "parent"
                    | "mainManager"
                    | "pole"
                    | "agency"
                    | "guests"
                    | "visibility"
                    | "money"
                    | "state"
                    | "typeOf"
                    | "tools"
                    | "mobilityAreas"
                    | "activityAreas"
                    | "expertiseArea"
                    | "alert"
                    | "address"
                    | "email"
                    | "phone"
                    | "iFrame"
                    | "date"
                    | "datetime"
                    | "period"
                    | "periodtime"
                    | "nationality"
                    | "country";
                  col: number;
                  row: number;
                  span: number;
                }
              | {
                  id: string;
                  title?: string;
                  placeholder?: string;
                  suffix?: string;
                  options?: unknown[];
                  settings: {
                    maxLenth?: number;
                    required?: boolean;
                    multiple?: boolean;
                    readOnly?: boolean;
                    noTitle?: boolean;
                    maxFiles?: number;
                    precision?: number;
                    hasMin?: boolean;
                    min?: number;
                    hasMax?: boolean;
                    max?: number;
                    optionColors?: unknown[];
                    optionsIsEnabled?: unknown[];
                    displayNumberSelected?: boolean;
                    defaultValue?:
                      | boolean
                      | number
                      | (
                          | "veryGood"
                          | "good"
                          | "bad"
                          | "veryBad"
                          | "fromParent"
                          | "fromParentMainManager"
                          | "fromParentHrManager"
                          | "fromCurrentUser"
                          | "fromParentAgency"
                          | "fromParentPole"
                          | "fromCurrentUserAgency"
                          | "fromCurrentUserPole"
                        )
                      | unknown[];
                    module?:
                      | "resources"
                      | "candidates"
                      | "contacts"
                      | "companies"
                      | "products"
                      | "opportunities"
                      | "projects"
                      | "purchases";
                    alertType?: "info" | "warning" | "danger";
                    url?: string;
                    scrolling?: boolean;
                    height?: number;
                    asReference?: boolean;
                    owner?: boolean;
                    nonOwnerCanReadAnswer?: boolean;
                    canBeSearched?: boolean;
                  };
                  typeOf?:
                    | "barometer"
                    | "select"
                    | "textarea"
                    | "html"
                    | "text"
                    | "currency"
                    | "files"
                    | "float"
                    | "int"
                    | "bool"
                    | "parent"
                    | "mainManager"
                    | "pole"
                    | "agency"
                    | "guests"
                    | "visibility"
                    | "money"
                    | "state"
                    | "typeOf"
                    | "tools"
                    | "mobilityAreas"
                    | "activityAreas"
                    | "expertiseArea"
                    | "alert"
                    | "address"
                    | "email"
                    | "phone"
                    | "iFrame"
                    | "date"
                    | "datetime"
                    | "period"
                    | "periodtime"
                    | "nationality"
                    | "country";
                  col: number;
                  row: number;
                  span: number;
                }
            )[];
          }
      )[];
    };
  };
}

/**
 * App's basic data sent in the body with a PUT method
 */
export interface SchemasMarketplaceBodyPutJson {
  data: {
    id: string;
    type: "app";
    attributes?: {
      name?: string;
      title?: string;
      category?:
        | "other"
        | "mail"
        | "calendar"
        | "mailAndCalendar"
        | "certification"
        | "emailing"
        | "templates"
        | "ged"
        | "viewer";
      url?: string;
      website?: string;
      testimoniesUrl?: string;
      termsOfUseUrl?: string;
      description?: string;
      price?: string;
      /**
       * Customer's absolute logo url
       */
      logo?: string;
      isPublic?: boolean;
      tokenSecurity?: "permanent" | "temporary";
      isValidated?: boolean;
      hasConfigurationPage?: boolean;
      /**
       * List of APIs allowed
       */
      apisAllowed?: {
        page:
          | "application/dictionary"
          | "application/perimeters"
          | "application/flags"
          | "application/assignments"
          | "purchases"
          | "payments"
          | "actions"
          | "opportunities"
          | "candidates"
          | "absencesReports"
          | "expensesReports"
          | "timesReports"
          | "invoices"
          | "orders"
          | "billing-deliveries-purchases-balance"
          | "billing-monthly-schedule"
          | "billing-projects-balance"
          | "billing-schedules-balance"
          | "contacts"
          | "companies"
          | "positionings"
          | "products"
          | "projects"
          | "deliveries-inactivities-groupments"
          | "resources"
          | "accounts"
          | "dashboard"
          | "accounts/(id}"
          | "resources/@id"
          | "resources/@id/information"
          | "resources/@id/administrative"
          | "resources/@id/technical-data"
          | "resources/@id/actions"
          | "resources/@id/positionings"
          | "resources/@id/deliveries"
          | "resources/@id/times-reports"
          | "resources/@id/expenses-reports"
          | "resources/@id/absences-reports"
          | "resources/@id/absences-accounts"
          | "candidates/@id"
          | "candidates/@id/information"
          | "candidates/@id/administrative"
          | "candidates/@id/technical-data"
          | "candidates/@id/actions"
          | "candidates/@id/positionings"
          | "contacts/@id"
          | "contacts/@id/information"
          | "contacts/@id/actions"
          | "contacts/@id/opportunities"
          | "contacts/@id/projects"
          | "contacts/@id/purchases"
          | "contacts/@id/orders"
          | "contacts/@id/invoices"
          | "companies/@id"
          | "companies/@id/information"
          | "companies/@id/contacts"
          | "companies/@id/actions"
          | "companies/@id/opportunities"
          | "companies/@id/projects"
          | "companies/@id/purchases"
          | "companies/@id/orders"
          | "companies/@id/invoices"
          | "opportunities/@id"
          | "opportunities/@id/information"
          | "opportunities/@id/positionings"
          | "opportunities/@id/actions"
          | "absencesReports/@id"
          | "invoices/@id"
          | "invoices/@id/information"
          | "invoices/@id/actions"
          | "timesReports/@id"
          | "expensesReports/@id"
          | "deliveries/@id"
          | "groupments/@id"
          | "inactivities/@id"
          | "products/@id"
          | "products/@id/information"
          | "products/@id/actions"
          | "products/@id/opportunities"
          | "products/@id/projects"
          | "projects/@id"
          | "projects/@id/information"
          | "projects/@id/batches-markers"
          | "projects/@id/actions"
          | "projects/@id/deliveries"
          | "projects/@id/advantages"
          | "projects/@id/purchases"
          | "projects/@id/productivity"
          | "projects/@id/orders"
          | "purchases/@id"
          | "purchases/@id/information"
          | "purchases/@id/payments"
          | "purchases/@id/actions"
          | "purchases/@id/projects"
          | "payments/@id"
          | "positionings/@id"
          | "actions/@id"
          | "advantages/@id"
          | "orders/@id"
          | "orders/@id/information"
          | "orders/@id/invoices"
          | "orders/@id/actions"
          | "contracts/@id"
          | "technical-datas"
          | "technical-datas/@id";
        event: "read" | "create" | "update" | "delete";
      }[];
      /**
       * List of customers codes
       */
      customersAllowed?: string[];
      /**
       * List of IPs
       */
      hostsAllowed?: string[];
      /**
       * List of buttons
       */
      buttonsSetting?: {
        page:
          | "resources/@id"
          | "resources/@id/information"
          | "resources/@id/administrative"
          | "resources/@id/technical-data"
          | "resources/@id/actions"
          | "resources/@id/positionings"
          | "resources/@id/deliveries-inactivities"
          | "resources/@id/times-reports"
          | "resources/@id/expenses-reports"
          | "resources/@id/absences-reports"
          | "resources/@id/absences-accounts"
          | "candidates/@id"
          | "candidates/@id/information"
          | "candidates/@id/administrative"
          | "candidates/@id/technical-data"
          | "candidates/@id/actions"
          | "candidates/@id/positionings"
          | "contacts/@id"
          | "contacts/@id/information"
          | "contacts/@id/actions"
          | "contacts/@id/opportunities"
          | "contacts/@id/projects"
          | "contacts/@id/purchases"
          | "contacts/@id/orders"
          | "contacts/@id/invoices"
          | "companies/@id"
          | "companies/@id/information"
          | "companies/@id/contacts"
          | "companies/@id/actions"
          | "companies/@id/opportunities"
          | "companies/@id/projects"
          | "companies/@id/purchases"
          | "companies/@id/orders"
          | "companies/@id/invoices"
          | "opportunities/@id"
          | "opportunities/@id/information"
          | "opportunities/@id/positionings"
          | "opportunities/@id/actions"
          | "absences-reports/@id"
          | "invoices/@id"
          | "invoices/@id/information"
          | "invoices/@id/actions"
          | "times-reports/@id"
          | "expenses-reports/@id"
          | "deliveries/@id"
          | "groupments/@id"
          | "inactivities/@id"
          | "products/@id"
          | "products/@id/information"
          | "products/@id/actions"
          | "products/@id/opportunities"
          | "products/@id/projects"
          | "projects/@id"
          | "projects/@id/information"
          | "projects/@id/batches-markers"
          | "projects/@id/actions"
          | "projects/@id/deliveries-groupments"
          | "projects/@id/advantages"
          | "projects/@id/purchases"
          | "projects/@id/productivity"
          | "projects/@id/orders"
          | "purchases/@id"
          | "purchases/@id/information"
          | "purchases/@id/payments"
          | "purchases/@id/actions"
          | "purchases/@id/projects"
          | "payments/@id"
          | "positionings/@id"
          | "actions/@id"
          | "advantages/@id"
          | "orders/@id"
          | "orders/@id/information"
          | "orders/@id/invoices"
          | "orders/@id/actions"
          | "contracts/@id"
          | "purchases"
          | "payments"
          | "actions"
          | "opportunities"
          | "candidates"
          | "absences-reports"
          | "expenses-reports"
          | "times-reports"
          | "invoices"
          | "orders"
          | "billing-deliveries-purchases-balance"
          | "billing-monthly-schedule"
          | "billing-projects-balance"
          | "billing-schedules-balance"
          | "contacts"
          | "companies"
          | "positionings"
          | "products"
          | "projects"
          | "deliveries-inactivities-groupments"
          | "resources";
        title: string;
        function: string;
      }[];
      /**
       * List of iFrames
       */
      iFramesSetting?: {
        page:
          | "dashboard"
          | "resources/@id"
          | "resources/@id/information"
          | "resources/@id/administrative"
          | "resources/@id/technical-data"
          | "resources/@id/actions"
          | "resources/@id/positionings"
          | "resources/@id/deliveries"
          | "resources/@id/times-reports"
          | "resources/@id/expenses-reports"
          | "resources/@id/absences-reports"
          | "resources/@id/absences-accounts"
          | "candidates/@id"
          | "candidates/@id/information"
          | "candidates/@id/administrative"
          | "candidates/@id/technical-data"
          | "candidates/@id/actions"
          | "candidates/@id/positionings"
          | "contacts/@id"
          | "contacts/@id/information"
          | "contacts/@id/actions"
          | "contacts/@id/opportunities"
          | "contacts/@id/projects"
          | "contacts/@id/purchases"
          | "contacts/@id/orders"
          | "contacts/@id/invoices"
          | "companies/@id"
          | "companies/@id/information"
          | "companies/@id/contacts"
          | "companies/@id/actions"
          | "companies/@id/opportunities"
          | "companies/@id/projects"
          | "companies/@id/purchases"
          | "companies/@id/orders"
          | "companies/@id/invoices"
          | "opportunities/@id"
          | "opportunities/@id/information"
          | "opportunities/@id/positionings"
          | "opportunities/@id/actions"
          | "absencesReports/@id"
          | "invoices/@id"
          | "invoices/@id/information"
          | "invoices/@id/actions"
          | "times-reports/@id"
          | "expenses-reports/@id"
          | "deliveries/@id"
          | "groupments/@id"
          | "inactivities/@id"
          | "products/@id"
          | "products/@id/information"
          | "products/@id/actions"
          | "products/@id/opportunities"
          | "products/@id/projects"
          | "projects/@id"
          | "projects/@id/information"
          | "projects/@id/batches-markers"
          | "projects/@id/actions"
          | "projects/@id/deliveries"
          | "projects/@id/advantages"
          | "projects/@id/purchases"
          | "projects/@id/productivity"
          | "projects/@id/orders"
          | "purchases/@id"
          | "purchases/@id/information"
          | "purchases/@id/payments"
          | "purchases/@id/actions"
          | "purchases/@id/projects"
          | "payments/@id"
          | "positionings/@id"
          | "actions/@id"
          | "advantages/@id"
          | "orders/@id"
          | "orders/@id/information"
          | "orders/@id/invoices"
          | "orders/@id/actions"
          | "contracts/@id";
        scrolling: boolean;
        height: number;
        isHalfWidth: boolean;
        function: string;
      }[];
      /**
       * List of triggers
       */
      triggersSetting?: {
        page:
          | "actions/@id"
          | "candidates/@id"
          | "resources/@id"
          | "products/@id"
          | "contracts/@id"
          | "advantages/@id"
          | "opportunities/@id"
          | "projects/@id"
          | "positionings/@id"
          | "deliveries/@id"
          | "groupments/@id"
          | "inactivities/@id"
          | "times-reports/@id"
          | "expenses-reports/@id"
          | "absences-reports/@id"
          | "purchases/@id"
          | "payments/@id"
          | "orders/@id"
          | "invoices/@id"
          | "contacts/@id"
          | "companies/@id";
        event: "create" | "update" | "delete";
        function: string;
      }[];
      /**
       * List of widgets
       */
      widgetsSetting?: {
        page?: "topBar" | "bottomLeft" | "bottomRight";
        function: string;
      }[];
      /**
       * List of models
       */
      allowedModels?: string[];
      /**
       * List of features that will be added in allow attribute for iframe tag
       */
      allowedIframeFeatures?: string[];
      /**
       * Tab for sections customized
       */
      tab?: "information" | "administrative" | "technicalData";
      allowGuestsValidation?: boolean;
      allowManagersValidation?: boolean;
      allowAccessToMyProfile?: boolean;
      actionTypeOf?: number;
      allowEntitiesAction?: "" | "created" | "mainManagerValidated" | "guestsValidated" | "allValidated";
      /**
       * List of fields to show in the parent's tab
       */
      defaultColumnsForParent?: string[];
      /**
       * List of fields to show in the search's view
       */
      defaultColumnsForSearch?: string[];
      sharingMailObject?: string;
      sharingMailBody?: string;
      validatedMailObject?: string;
      validatedMailBody?: string;
      /**
       * List of sections of fields & applications customized
       */
      sections?: (
        | {
            title: string;
            col: number;
            row: number;
            span: number;
            showUpdateDate: boolean;
            /**
             * List of fields
             */
            fields: {
              title?: string;
              placeholder?: string;
              suffix?: string;
              options?: unknown[];
              settings: {
                maxLenth?: number;
                required?: boolean;
                multiple?: boolean;
                readOnly?: boolean;
                noTitle?: boolean;
                maxFiles?: number;
                precision?: number;
                hasMin?: boolean;
                min?: number;
                hasMax?: boolean;
                max?: number;
                optionColors?: unknown[];
                optionsIsEnabled?: unknown[];
                displayNumberSelected?: boolean;
                defaultValue?:
                  | boolean
                  | number
                  | (
                      | "veryGood"
                      | "good"
                      | "bad"
                      | "veryBad"
                      | "fromParent"
                      | "fromParentMainManager"
                      | "fromParentHrManager"
                      | "fromCurrentUser"
                      | "fromParentAgency"
                      | "fromParentPole"
                      | "fromCurrentUserAgency"
                      | "fromCurrentUserPole"
                    )
                  | unknown[];
                module?:
                  | "resources"
                  | "candidates"
                  | "contacts"
                  | "companies"
                  | "products"
                  | "opportunities"
                  | "projects"
                  | "purchases";
                alertType?: "info" | "warning" | "danger";
                url?: string;
                scrolling?: boolean;
                height?: number;
                asReference?: boolean;
                owner?: boolean;
                nonOwnerCanReadAnswer?: boolean;
                canBeSearched?: boolean;
              };
              typeOf?:
                | "barometer"
                | "select"
                | "textarea"
                | "html"
                | "text"
                | "currency"
                | "files"
                | "float"
                | "int"
                | "bool"
                | "parent"
                | "mainManager"
                | "pole"
                | "agency"
                | "guests"
                | "visibility"
                | "money"
                | "state"
                | "typeOf"
                | "tools"
                | "mobilityAreas"
                | "activityAreas"
                | "expertiseArea"
                | "alert"
                | "address"
                | "email"
                | "phone"
                | "iFrame"
                | "date"
                | "datetime"
                | "period"
                | "periodtime"
                | "nationality"
                | "country";
              col: number;
              row: number;
              span: number;
            }[];
          }
        | {
            id: string;
            title: string;
            col: number;
            row: number;
            span: number;
            showUpdateDate: boolean;
            /**
             * List of fields
             */
            fields: (
              | {
                  title?: string;
                  placeholder?: string;
                  suffix?: string;
                  options?: unknown[];
                  settings: {
                    maxLenth?: number;
                    required?: boolean;
                    multiple?: boolean;
                    readOnly?: boolean;
                    noTitle?: boolean;
                    maxFiles?: number;
                    precision?: number;
                    hasMin?: boolean;
                    min?: number;
                    hasMax?: boolean;
                    max?: number;
                    optionColors?: unknown[];
                    optionsIsEnabled?: unknown[];
                    displayNumberSelected?: boolean;
                    defaultValue?:
                      | boolean
                      | number
                      | (
                          | "veryGood"
                          | "good"
                          | "bad"
                          | "veryBad"
                          | "fromParent"
                          | "fromParentMainManager"
                          | "fromParentHrManager"
                          | "fromCurrentUser"
                          | "fromParentAgency"
                          | "fromParentPole"
                          | "fromCurrentUserAgency"
                          | "fromCurrentUserPole"
                        )
                      | unknown[];
                    module?:
                      | "resources"
                      | "candidates"
                      | "contacts"
                      | "companies"
                      | "products"
                      | "opportunities"
                      | "projects"
                      | "purchases";
                    alertType?: "info" | "warning" | "danger";
                    url?: string;
                    scrolling?: boolean;
                    height?: number;
                    asReference?: boolean;
                    owner?: boolean;
                    nonOwnerCanReadAnswer?: boolean;
                    canBeSearched?: boolean;
                  };
                  typeOf?:
                    | "barometer"
                    | "select"
                    | "textarea"
                    | "html"
                    | "text"
                    | "currency"
                    | "files"
                    | "float"
                    | "int"
                    | "bool"
                    | "parent"
                    | "mainManager"
                    | "pole"
                    | "agency"
                    | "guests"
                    | "visibility"
                    | "money"
                    | "state"
                    | "typeOf"
                    | "tools"
                    | "mobilityAreas"
                    | "activityAreas"
                    | "expertiseArea"
                    | "alert"
                    | "address"
                    | "email"
                    | "phone"
                    | "iFrame"
                    | "date"
                    | "datetime"
                    | "period"
                    | "periodtime"
                    | "nationality"
                    | "country";
                  col: number;
                  row: number;
                  span: number;
                }
              | {
                  id: string;
                  title?: string;
                  placeholder?: string;
                  suffix?: string;
                  options?: unknown[];
                  settings: {
                    maxLenth?: number;
                    required?: boolean;
                    multiple?: boolean;
                    readOnly?: boolean;
                    noTitle?: boolean;
                    maxFiles?: number;
                    precision?: number;
                    hasMin?: boolean;
                    min?: number;
                    hasMax?: boolean;
                    max?: number;
                    optionColors?: unknown[];
                    optionsIsEnabled?: unknown[];
                    displayNumberSelected?: boolean;
                    defaultValue?:
                      | boolean
                      | number
                      | (
                          | "veryGood"
                          | "good"
                          | "bad"
                          | "veryBad"
                          | "fromParent"
                          | "fromParentMainManager"
                          | "fromParentHrManager"
                          | "fromCurrentUser"
                          | "fromParentAgency"
                          | "fromParentPole"
                          | "fromCurrentUserAgency"
                          | "fromCurrentUserPole"
                        )
                      | unknown[];
                    module?:
                      | "resources"
                      | "candidates"
                      | "contacts"
                      | "companies"
                      | "products"
                      | "opportunities"
                      | "projects"
                      | "purchases";
                    alertType?: "info" | "warning" | "danger";
                    url?: string;
                    scrolling?: boolean;
                    height?: number;
                    asReference?: boolean;
                    owner?: boolean;
                    nonOwnerCanReadAnswer?: boolean;
                    canBeSearched?: boolean;
                  };
                  typeOf?:
                    | "barometer"
                    | "select"
                    | "textarea"
                    | "html"
                    | "text"
                    | "currency"
                    | "files"
                    | "float"
                    | "int"
                    | "bool"
                    | "parent"
                    | "mainManager"
                    | "pole"
                    | "agency"
                    | "guests"
                    | "visibility"
                    | "money"
                    | "state"
                    | "typeOf"
                    | "tools"
                    | "mobilityAreas"
                    | "activityAreas"
                    | "expertiseArea"
                    | "alert"
                    | "address"
                    | "email"
                    | "phone"
                    | "iFrame"
                    | "date"
                    | "datetime"
                    | "period"
                    | "periodtime"
                    | "nationality"
                    | "country";
                  col: number;
                  row: number;
                  span: number;
                }
            )[];
          }
      )[];
    };
  };
}


// ─── documents ───
/**
 * Document's basic data
 */
export interface SchemasDocumentsProfileJson {
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
    type: "document";
    attributes?: {
      name?: string;
      category?: "other" | "signedProof" | "signatureRequested";
      size?: {
        [k: string]: unknown;
      };
    };
    relationships?: {
      /**
       * The project related to the document
       */
      project?: {
        data: {
          id: string;
          type: "project";
        };
      };
      /**
       * The parsed document related to the document
       */
      parsedDocument?: {
        data: {
          id: string;
          type: "parseddocument";
        };
      };
    };
  };
  included?: (
    | {
        id: string;
        type: "project";
        attributes?: {
          reference?: string;
          /**
           * If false then project is not accessible
           */
          canReadProject?: boolean;
        };
      }
    | {
        id: string;
        type: "parseddocument";
        attributes?: {
          creationDate?: string;
          score?: number;
          provider?: "hrflow" | "mindee" | "openai" | "azure";
          useCache?: boolean;
          parsingData?: {
            [k: string]: unknown;
          };
        };
        relationships?: {
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
                  type: "expensesreport";
                };
              }
            | {
                data: {
                  id: string;
                  type: "providerinvoice";
                };
              };
        };
      }
    | {
        id: string;
        type: "resource";
        attributes?: {
          civility?: number;
          typeOf?: number;
          state?: number;
          email1?: string;
          email2?: string;
          email3?: string;
          phone1?: string;
          phone2?: string;
          phone3?: string;
          address?: string;
          postcode?: string;
          town?: string;
          country?: string;
          firstName?: string;
          lastName?: string;
          title?: string;
          skills?: string;
          dateOfBirth?: string;
          placeOfBirth?: string;
          diplomas?: string[];
          activityAreas?: string[];
          /**
           * List of mobilities {id}
           */
          mobilityAreas?: string[];
          situation?: number;
          languages?: {
            language: string;
            /**
             * Language level {id}
             */
            level: string;
          }[];
          expertiseAreas?: string[];
          experience?: number;
          references?: {
            id: string;
            title: string;
            description: string;
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
          training?: string;
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
                }
              ]
            | [
                {
                  network: "facebook" | "viadeo" | "linkedin" | "x";
                  url: string;
                },
                {
                  network: "facebook" | "viadeo" | "linkedin" | "x";
                  url: string;
                }
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
                }
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
                }
              ];
        };
      }
    | {
        id: string;
        type: "resource";
        attributes?: {
          civility?: number;
          typeOf?: number;
          state?: number;
          email2?: string;
          email3?: string;
          phone1?: string;
          phone2?: string;
          phone3?: string;
          address?: string;
          postcode?: string;
          town?: string;
          country?: string;
          firstName?: string;
          lastName?: string;
          title?: string;
          skills?: string;
          dateOfBirth?: string;
          placeOfBirth?: string;
          diplomas?: string[];
          activityAreas?: string[];
          /**
           * List of mobilities {id}
           */
          mobilityAreas?: string[];
          situation?: number;
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
          training?: string;
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
                }
              ]
            | [
                {
                  network: "facebook" | "viadeo" | "linkedin" | "x";
                  url: string;
                },
                {
                  network: "facebook" | "viadeo" | "linkedin" | "x";
                  url: string;
                }
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
                }
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
                }
              ];
        };
      }
  )[];
}

/**
 * Document's information data sent in the body with a PUT method
 */
export interface SchemasDocumentsProfileBodyPutJson {
  data: {
    id: string;
    type: "document";
    attributes?: {
      name: string;
      category: "other" | "signedProof" | "signatureRequested";
      size?: {
        [k: string]: unknown;
      };
    };
    relationships?: {
      /**
       * The project related to the document
       */
      project?: {
        data: {
          id: string;
          type: "project";
        };
      };
    };
  };
}


// ─── savedsearches ───
/**
 * List of current user saved search
 */
export interface SchemasSavedsearchesSearchJson {
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
    type: "savedsearch";
    attributes?: {
      module?: string;
      name?: string;
      params?: {
        [k: string]: unknown;
      };
      /**
       * Sharing object
       */
      share?: {
        /**
         * Share with all agencies and given resource types
         */
        allAgenciesTypesOf?: (string | number)[];
        /**
         * Share with given agencies and given resource types
         */
        agenciesTypesOf?:
          | []
          | [
              {
                agency?: {
                  id?: string;
                  name?: string;
                };
                typesOf?: (string | number)[];
              }
            ];
        /**
         * Share with given resources
         */
        resources?:
          | []
          | [
              {
                id?: string;
                firstName?: string;
                lastName?: string;
              }
            ];
        /**
         * Number of sharings
         */
        numberOfSharings?: number;
        [k: string]: unknown;
      };
      date?: string;
      dateUpdate?: string;
    };
    relationships?: {
      createdBy: {
        data: {
          id: string;
          type: "resource";
        };
      };
    };
  }[];
  included?: {
    id: string;
    type: "resource";
    attributes?: {
      lastName?: string;
      firstName?: string;
    };
  }[];
}

/**
 * User's saved search
 */
export interface SchemasSavedsearchesProfileJson {
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
    type: "savedsearch";
    attributes?: {
      module?: string;
      name?: string;
      params?: {
        [k: string]: unknown;
      };
      /**
       * Sharing object
       */
      share?: {
        /**
         * Share with all agencies and given resource types
         */
        allAgenciesTypesOf?: (string | number)[];
        /**
         * Share with given agencies and given resource types
         */
        agenciesTypesOf?:
          | []
          | [
              {
                agency?: {
                  id?: string;
                  name?: string;
                };
                typesOf?: (string | number)[];
              }
            ];
        /**
         * Share with given resources
         */
        resources?:
          | []
          | [
              {
                id?: string;
                firstName?: string;
                lastName?: string;
              }
            ];
        /**
         * Number of sharings
         */
        numberOfSharings?: number;
        [k: string]: unknown;
      };
    };
    relationships?: {
      createdBy?: {
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
      lastName?: string;
      firstName?: string;
    };
  }[];
}

/**
 * User's saved search data sent in the body with a POST method
 */
export interface SchemasSavedsearchesBodyPostJson {
  data: {
    type: "savedsearch";
    attributes?: {
      module: string;
      name: string;
      params?: {
        [k: string]: unknown;
      };
      /**
       * Sharing object
       */
      share?: {
        /**
         * Share with all agencies and given resource types
         */
        allAgenciesTypesOf?: (string | number)[];
        /**
         * Share with given agencies and given resource types
         */
        agenciesTypesOf?:
          | []
          | [
              {
                agency?: {
                  id?: string;
                };
                typesOf?: (string | number)[];
              }
            ];
        /**
         * Share with given resources
         */
        resources?:
          | []
          | [
              {
                id?: string;
              }
            ];
        [k: string]: unknown;
      };
    };
    relationships?: {
      createdBy: {
        data: {
          id: string;
          type: "resource";
        };
      };
    };
  };
}

/**
 * User's saved search data sent in the body with a PUT method
 */
export interface SchemasSavedsearchesBodyPutJson {
  data: {
    id: string;
    type: "savedsearch";
    attributes?: {
      name?: string;
      params?: {
        [k: string]: unknown;
      };
      /**
       * Sharing object
       */
      share?: {
        /**
         * Share with all agencies and given resource types
         */
        allAgenciesTypesOf?: (string | number)[];
        /**
         * Share with given agencies and given resource types
         */
        agenciesTypesOf?:
          | []
          | [
              {
                agency?: {
                  id?: string;
                };
                typesOf?: (string | number)[];
              }
            ];
        /**
         * Share with given resources
         */
        resources?:
          | []
          | [
              {
                id?: string;
              }
            ];
        [k: string]: unknown;
      };
    };
    relationships?: {
      createdBy: {
        data: {
          id: string;
          type: "resource";
        };
      };
    };
  };
}


// ─── todolists ───
/**
 * List of Todolists
 */
export interface SchemasTodolistsSearchJson {
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
    type: "todolist";
    attributes?: {
      title?: string;
      state?: boolean;
      profile?:
        | (
            | "absencesreport"
            | "advantage"
            | "candidate"
            | "compagny"
            | "contact"
            | "contract"
            | "delivery"
            | "expensesreport"
            | "invoice"
            | "opportunity"
            | "order"
            | "payment"
            | "positioning"
            | "product"
            | "project"
            | "purchase"
            | "quotation"
            | "resource"
            | "timesreport"
          )
        | string;
      /**
       * Profile's typeOf triggering the TodoList
       */
      profileTypesOf?: unknown[];
      /**
       * Profile's state triggering the TodoList
       */
      profileStates?: unknown[];
      /**
       * Parent profile's typeOf triggering the TodoList
       */
      parentProfileTypesOf?: unknown[];
      /**
       * Parent profile's state triggering the TodoList
       */
      parentProfileStates?: unknown[];
      /**
       * List of agencies
       */
      agencies?: {
        id: string;
        name: string;
      }[];
    };
    relationships?: {
      /**
       * TodoList's app
       */
      app?: {
        data: {
          id: string;
          type: "app";
        };
      };
    };
  }[];
  included?: {
    id: string;
    type: "app";
    attributes?: {
      name?: string;
    };
  }[];
}

/**
 * TodoList data
 */
export interface SchemasTodolistsProfileJson {
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
    type: "todolist";
    attributes?: {
      title?: string;
      state?: boolean;
      profile?:
        | (
            | "absencesreport"
            | "advantage"
            | "candidate"
            | "compagny"
            | "contact"
            | "contract"
            | "delivery"
            | "expensesreport"
            | "invoice"
            | "opportunity"
            | "order"
            | "payment"
            | "positioning"
            | "product"
            | "project"
            | "purchase"
            | "quotation"
            | "resource"
            | "timesreport"
          )
        | string;
      /**
       * Profile's typeOf triggering the TodoList
       */
      profileTypesOf?: unknown[];
      /**
       * Profile's state triggering the TodoList
       */
      profileStates?: unknown[];
      /**
       * Parent profile's typeOf triggering the TodoList
       */
      parentProfileTypesOf?: unknown[];
      /**
       * Parent profile's state triggering the TodoList
       */
      parentProfileStates?: unknown[];
      /**
       * List of agencies
       */
      agencies?: {
        id: string;
        name: string;
      }[];
      /**
       * List of Tasks
       */
      tasks?: {
        id: string;
        description: string;
        state: boolean;
        idParent?: number;
      }[];
    };
    relationships?: {
      /**
       * TodoList's app
       */
      app?: {
        data: {
          id: string;
          type: "app";
        };
      };
    };
  };
  included?: {
    id: string;
    type: "app";
    attributes?: {
      name?: string;
    };
  }[];
}

/**
 * Empty TodoList's default basic data
 */
export interface SchemasTodolistsDefaultJson {
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
    id: "0";
    type: "todolist";
    attributes?: {
      title?: string;
      state?: boolean;
      profile?:
        | (
            | "absencesreport"
            | "advantage"
            | "candidate"
            | "compagny"
            | "contact"
            | "contract"
            | "delivery"
            | "expensesreport"
            | "invoice"
            | "opportunity"
            | "order"
            | "payment"
            | "positioning"
            | "product"
            | "project"
            | "purchase"
            | "quotation"
            | "resource"
            | "timesreport"
          )
        | string;
      /**
       * Profile's typeOf triggering the TodoList
       */
      profileTypesOf?: unknown[];
      /**
       * Profile's state triggering the TodoList
       */
      profileStates?: unknown[];
      /**
       * Parent profile's typeOf triggering the TodoList
       */
      parentProfileTypesOf?: unknown[];
      /**
       * Parent profile's state triggering the TodoList
       */
      parentProfileStates?: unknown[];
      /**
       * List of agencies
       */
      agencies?: {
        id: string;
        name: string;
      }[];
      /**
       * List of Tasks
       */
      tasks?: {
        id: string;
        description: string;
        state: boolean;
        idParent?: number;
      }[];
    };
  };
}

/**
 * Todolist's basic data sent in the body with a POST method
 */
export interface SchemasTodolistsBodyPostJson {
  data: {
    type: "todolist";
    attributes: {
      title: string;
      state?: boolean;
      profile?:
        | (
            | "absencesreport"
            | "advantage"
            | "candidate"
            | "compagny"
            | "contact"
            | "contract"
            | "delivery"
            | "expensesreport"
            | "invoice"
            | "opportunity"
            | "order"
            | "payment"
            | "positioning"
            | "product"
            | "project"
            | "purchase"
            | "quotation"
            | "resource"
            | "timesreport"
          )
        | string;
      /**
       * Profile's typeOf triggering the TodoList
       */
      profileTypesOf?: unknown[];
      /**
       * Profile's state triggering the TodoList
       */
      profileStates?: unknown[];
      /**
       * Parent profile's typeOf triggering the TodoList
       */
      parentProfileTypesOf?: unknown[];
      /**
       * Parent profile's state triggering the TodoList
       */
      parentProfileStates?: unknown[];
      /**
       * List of agencies
       */
      agencies?: {
        id: string;
        name: string;
      }[];
      /**
       * List of Tasks
       */
      tasks?: {
        id: string;
        description: string;
        state: boolean;
        idParent?: number;
      }[];
    };
  };
}

/**
 * Todolist's basic data sent in the body with a POST method
 */
export interface SchemasTodolistsBodyPutJson {
  data: {
    id: string;
    type: "todolist";
    attributes?: {
      title?: string;
      state?: boolean;
      profile?:
        | (
            | "absencesreport"
            | "advantage"
            | "candidate"
            | "compagny"
            | "contact"
            | "contract"
            | "delivery"
            | "expensesreport"
            | "invoice"
            | "opportunity"
            | "order"
            | "payment"
            | "positioning"
            | "product"
            | "project"
            | "purchase"
            | "quotation"
            | "resource"
            | "timesreport"
          )
        | string;
      /**
       * Profile's typeOf triggering the TodoList
       */
      profileTypesOf?: unknown[];
      /**
       * Profile's state triggering the TodoList
       */
      profileStates?: unknown[];
      /**
       * Parent profile's typeOf triggering the TodoList
       */
      parentProfileTypseOf?: unknown[];
      /**
       * Parent profile's state triggering the TodoList
       */
      parentProfileStates?: unknown[];
      /**
       * List of agencies
       */
      agencies?: {
        id: string;
        name: string;
      }[];
      /**
       * List of Tasks
       */
      tasks?: {
        id: string;
        description: string;
        state: boolean;
        idParent?: number;
      }[];
    };
  };
}


// ─── threads ───
/**
 * List of threads
 */
export interface SchemasThreadsSearchJson {
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
    type: "thread";
    attributes?: {
      creationDate?: string;
      updateDate?: string;
      text?: string;
      share?: boolean;
      numberOfAnswers?: number;
    };
    relationships?: {
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
      dependsOn?:
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
          }
        | {
            data: {
              id: string;
              type: "appentity";
            };
          }
        | {
            data: {
              id: string;
              type: "form";
            };
          };
      /**
       * List of managers mentioned
       */
      mentions?: {
        data: {
          id?: string;
          type?: "resource";
        }[];
      };
      parentThread?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "thread";
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
        type: "resource";
        attributes?: {
          firstName?: string;
          lastName?: string;
          thumbnail?: string;
        };
      }
  )[];
}

/**
 * Thread's basic data
 */
export interface SchemasThreadsProfileJson {
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
    type: "thread";
    attributes?: {
      creationDate?: string;
      updateDate?: string;
      text?: string;
      share?: boolean;
      numberOfAnswers?: number;
    };
    relationships?: {
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
      dependsOn?:
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
          }
        | {
            data: {
              id: string;
              type: "appentity";
            };
          }
        | {
            data: {
              id: string;
              type: "form";
            };
          };
      /**
       * List of managers mentioned
       */
      mentions?: {
        data: {
          id?: string;
          type?: "resource";
        }[];
      };
      parentThread?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "thread";
            };
          };
    };
  };
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
        type: "resource";
        attributes?: {
          firstName?: string;
          lastName?: string;
          thumbnail?: string;
        };
      }
  )[];
}

/**
 * Thread's basic data
 */
export interface SchemasThreadsDefaultJson {
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
    enum?: ["0"];
    type: "thread";
    attributes?: {
      text?: string;
      share?: boolean;
    };
    relationships?: {
      dependsOn?:
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
              type: "thread";
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
          }
        | {
            data: {
              id: string;
              type: "appentity";
            };
          }
        | {
            data: {
              id: string;
              type: "form";
            };
          };
    };
  };
}

/**
 * Thread basic data sent in the body with a POST method
 */
export interface SchemasThreadsBodyPostJson {
  data?: {
    type?: "thread";
    attributes?: {
      text?: string;
      share?: boolean;
    };
    relationships?: {
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
      dependsOn:
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
              properties?: {
                [k: string]: unknown;
              };
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
              type: "thread";
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
          }
        | {
            data: {
              id: string;
              type: "appentity";
            };
          }
        | {
            data: {
              id: string;
              type: "form";
            };
          };
      /**
       * List of managers mentioned
       */
      mentions?: {
        data: {
          id: string;
          type: "resource";
        }[];
      };
      parentThread?:
        | {
            data: null;
          }
        | {
            data: {
              id: string;
              type: "thread";
            };
          };
    };
    required?: ["type", "attributes", "relationships"];
    additionalProperties?: never;
  };
  required?: ["data"];
  additionalProperties?: never;
}

/**
 * Thread basic data sent in the body with a PUT method
 */
export interface SchemasThreadsBodyPutJson {
  data: {
    id?: string;
    type: "thread";
    attributes?: {
      text?: string;
    };
    relationships?: {
      /**
       * List of managers mentioned
       */
      mentions?: {
        data: {
          id: string;
          type: "resource";
        }[];
      };
    };
  };
}


// ─── forms ───
/**
 * Form data
 */
export interface SchemasFormsProfileJson {
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
    type: "form";
    attributes?: {
      mailObject?: string;
      mailBody?: string;
      validated?: boolean;
      creationDate?: string;
      validateDate?: string;
      dependsOnCanShow?: string;
      /**
       * Form's questions
       */
      questions?: {
        id?: string;
        question?: string;
        description?: string;
        typeOf?: "barometer" | "singleChoice" | "multipleChoice" | "text" | "number";
        required?: boolean;
        state?: boolean;
        /**
         * Form's questions
         */
        choices?: {
          id?: string;
          description?: string;
        }[];
        response?: string;
      }[];
    };
    relationships?: {
      dependsOn?: {
        data: {
          id: string;
          type: "resource";
        }[];
      };
      recipient?: {
        data: {
          id: string;
          type: "resource";
        }[];
      };
      /**
       * Template associated to the form
       */
      template?: {
        data: {
          id: string;
          type: "formtemplate";
        }[];
      };
      /**
       * Creator of the form
       */
      createdBy?: {
        data: {
          id: string;
          type: "resource";
        }[];
      };
      /**
       * Validator of the form
       */
      validator?: {
        data: {
          id: string;
          type: "resource";
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
        };
      }
    | {
        id: string;
        type: "formtemplate";
        attributes?: {
          title?: string;
          description?: string;
          state?: boolean;
          additionalProperties?: never;
        };
      }
  )[];
}

/**
 * Empty form's default basic data
 */
export interface SchemasFormsDefaultJson {
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
    id: "0";
    type: "form";
    attributes?: {
      mailToRecipient?: {};
      mailObject?: string;
      mailBody?: string;
      dependsOnCanShow?: string;
      validated?: boolean;
    };
    relationships?: {
      /**
       * Form's recipient
       */
      recipient?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Form's dependsOn
       */
      dependsOn?: {
        data: {
          id: string;
          type: "resource";
        };
      };
      /**
       * Form's template
       */
      template?: {
        data: {
          id: string;
          type: "formtemplate";
        };
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
        };
      }
    | {
        id: string;
        type: "formtemplate";
        attributes?: {
          title?: string;
          mailTo?: string;
          mailObject?: string;
          mailBody?: string;
          /**
           * Form's template's questions
           */
          questions?: {
            id?: string;
            question?: string;
            description?: string;
            typeOf?: "barometer" | "singleChoice" | "multipleChoice" | "text" | "number";
            required?: boolean;
            state?: boolean;
            /**
             * Form's questions
             */
            choices?: {
              id?: string;
              description?: string;
            }[];
          }[];
        };
      }
  )[];
}

/**
 * Form's rights
 */
export interface SchemasFormsRightsJson {
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
        validate?: boolean;
        /**
         * true if this action is available
         */
        unvalidate?: boolean;
        /**
         * true if this action is available
         */
        remind?: boolean;
        /**
         * true if this action is available
         */
        seeLogs?: boolean;
        /**
         * true if this action is available
         */
        dependsOnCanShowOnValidate?: boolean;
        /**
         * true if this action is available
         */
        share?: boolean;
        /**
         * true if this action is available
         */
        seeThreads?: boolean;
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
        tasks?: {
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
        mailObject?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        mailBody?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        questions?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        validated?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        dependsOnCanShow?: {
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
 * Forms tasks data
 */
export interface SchemasFormsTasksJson {
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
    additionalTasks?: {
      id?: string;
      type?: "form";
      state?: "pending" | "validated";
      button?: {
        action?: "remindFormAction";
      };
    }[];
  };
  data: {
    id: string;
    type: "task";
    attributes?: {
      description?: string;
      row?: number;
      state?: boolean;
      validatedAt?: number;
      validatedBy?: {
        id?: string;
        firstName?: string;
        lastName?: string;
      };
    };
    relationships?: {
      /**
       * List of children tasks
       */
      children?: {
        data: {
          id: string;
          type: "task";
        }[];
      };
      /**
       * Task's todolist
       */
      todolist?: {
        data: {
          id: string;
          type: "todolist";
        }[];
      };
    };
  }[];
  included?: (
    | {
        id: string;
        type: "task";
        attributes?: {
          description?: string;
          row?: number;
          state?: boolean;
          validatedAt?: number;
          validatedBy?: {
            id?: string;
            firstName?: string;
            lastName?: string;
          };
        };
      }
    | {
        id: string;
        type: "todolist";
        attributes?: {
          title?: string;
        };
      }
  )[];
}


// ─── groupments ───
/**
 * Groupment's basic data
 */
export interface SchemasGroupmentsProfileJson {
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
    type: "groupment";
    attributes?: {
      startDate?: string;
      endDate?: string;
      title?: string;
      /**
       * Can not be set if delivery depends on a `groupment` and `forceAverageDailyPriceExcludingTax` is false
       */
      averageDailyPriceExcludingTax?: number;
      averageDailyCost?: number;
      numberOfDaysInvoicedOrQuantity?: number;
      numberOfDaysFree?: number;
      informationComments?: string;
      /**
       * Sum of all turnover on delivery & additional data excluding tax
       */
      turnoverSimulatedExcludingTax?: number;
      /**
       * Sum of all costs on delivery & additional data excluding tax
       */
      costsSimulatedExcludingTax?: number;
      /**
       * turnoverSimulatedExcludingTax - costsSimulatedExcludingTax
       */
      marginSimulatedExcludingTax?: number;
      /**
       * 100 * marginSimulatedExcludingTax / turnoverSimulatedExcludingTax
       */
      profitabilitySimulated?: number;
      loadDistribution?: "manual" | "proportional" | "weighted";
      /**
       * Groupment's deliveries
       */
      deliveries?: {
        /**
         * Delivery on which groupment depends
         */
        delivery: {
          id: string;
          title: string;
          startDate: string;
          endDate: string;
          /**
           * Can not be set if delivery depends on a `groupment` and `forceAverageDailyPriceExcludingTax` is false
           */
          averageDailyPriceExcludingTax?: number;
          averageDailyCost: number;
          additionalTurnoverExcludingTax?: number;
          additionalCostsExcludingTax?: number;
          dependsOn?: {
            id: string;
            firstName: string;
            lastName: string;
          };
          groupment?:
            | {
                data: null;
              }
            | {
                id: string;
              };
          /**
           * Master delivery on which delivery depends
           */
          master?: {
            data: {
              id: string;
            };
          };
          /**
           * Slave delivery on which delivery depends
           */
          slave?: {
            data: {
              id: string;
            };
          };
        };
        weighting: number;
        schedule: number;
      }[];
      creationDate?: string;
      updateDate?: string;
    };
    relationships?: {
      /**
       * Groupment's project
       */
      project?: {
        data: {
          id: string;
          type: "project";
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
       * List of groupment's files
       */
      files?: {
        data: {
          id: string;
          type: "document";
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
        };
      }
    | {
        id: string;
        type: "standardprofile";
        attributes?: {
          title?: string;
        };
      }
    | {
        id: string;
        type: "agency";
        attributes?: {
          name?: string;
          calendar?: string;
          exchangeRate?: number;
          currency?: number;
        };
      }
    | {
        id: string;
        type: "delivery";
        attributes?: {
          title?: string;
          startDate?: string;
          endDate?: string;
          averageDailyCost?: number;
          /**
           * Can not be set if delivery depends on a `groupment` and `forceAverageDailyPriceExcludingTax` is false
           */
          averageDailyPriceExcludingTax?: number;
          additionalTurnoverExcludingTax?: number;
          additionalCostsExcludingTax?: number;
        };
        relationships?: {
          /**
           * Delivery's resource
           */
          dependsOn?: {
            data: {
              id: string;
              type: "resource";
            };
          };
          /**
           * Delivery's groupment
           */
          groupment?: {
            data: {
              id: string;
              type: "groupment";
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
          currency?: number;
          exchangeRate?: number;
          currencyAgency?: number;
          exchangeRateAgency?: number;
          workUnitRate?: number;
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
          /**
           * Project's agency
           */
          agency?: {
            data: {
              id: string;
              type: "agency";
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
          technical?:
            | {
                data: null;
              }
            | {
                data: {
                  id: string;
                  type: "contact";
                };
              };
          /**
           * List of groupment's deliveries available
           */
          deliveries?: {
            data: {
              id: string;
              type: "delivery";
            }[];
          };
        };
      }
    | {
        id: string;
        type: "opportunity";
        attributes?: {
          title?: string;
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
        relationships?: {
          /**
           * Technical contact's company
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
        type: "company";
        attributes?: {
          name?: string;
        };
      }
    | {
        id: string;
        type: "document";
        attributes?: {
          name?: string;
        };
      }
  )[];
}

/**
 * Groupment's basic data
 */
export interface SchemasGroupmentsDefaultJson {
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
    id: "0";
    type: "groupment";
    attributes?: {
      startDate?: string;
      endDate?: string;
      loadDistribution?: "manual" | "proportional" | "weighted";
    };
    relationships?: {
      /**
       * Groupment's project
       */
      project?: {
        data: {
          id: string;
          type: "project";
        };
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
        };
      }
    | {
        id: string;
        type: "agency";
        attributes?: {
          name?: string;
          calendar?: string;
          exchangeRate?: number;
          currency?: number;
        };
      }
    | {
        id: string;
        type: "delivery";
        attributes?: {
          title?: string;
          startDate?: string;
          endDate?: string;
          averageDailyCost?: number;
          /**
           * Can not be set if delivery depends on a `groupment` and `forceAverageDailyPriceExcludingTax` is false
           */
          averageDailyPriceExcludingTax?: number;
          additionalTurnoverExcludingTax?: number;
          additionalCostsExcludingTax?: number;
        };
        relationships?: {
          /**
           * Delivery's resource
           */
          dependsOn?: {
            data: {
              id: string;
              type: "resource";
            };
          };
          /**
           * Delivery's groupment
           */
          groupment?: {
            data: {
              id: string;
              type: "groupment";
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
          startDate?: string;
          endDate?: string;
          currency?: number;
          exchangeRate?: number;
          currencyAgency?: number;
          exchangeRateAgency?: number;
          workUnitRate?: number;
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
          /**
           * Project's agency
           */
          agency?: {
            data: {
              id: string;
              type: "agency";
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
          technical?:
            | {
                data: null;
              }
            | {
                data: {
                  id: string;
                  type: "contact";
                };
              };
          /**
           * List of groupment's deliveries available
           */
          deliveries?: {
            data: {
              id: string;
              type: "delivery";
            }[];
          };
        };
      }
    | {
        id: string;
        type: "opportunity";
        attributes?: {
          title?: string;
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
        relationships?: {
          /**
           * Technical contact's company
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
        type: "company";
        attributes?: {
          name?: string;
        };
      }
  )[];
}

/**
 * Delivery's rights
 */
export interface SchemasGroupmentsRightsJson {
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
        addDelivery?: boolean;
        /**
         * true if this action is available
         */
        seeLogs?: boolean;
        /**
         * true if this action is available
         */
        duplicate?: boolean;
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
        startDate?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        endDate?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
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
        averageDailyCost?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        averageDailyPriceExcludingTax?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        averageWorkUnitPriceExcludingTax?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        numberOfDaysInvoicedOrQuantity?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        numberOfWorkUnitsInvoicedOrQuantity?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        costsSimulatedExcludingTax?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        marginSimulatedExcludingTax?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        profitabilitySimulated?: {
          /**
           * false if this attribute is not readable
           */
          read: boolean;
          /**
           * false if this attribute is not writable
           */
          write: boolean;
        };
        additionalTurnoverAndCosts?: {
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
 * Groupment's basic data sent in the body with a POST method
 */
export interface SchemasGroupmentsBodyPostJson {
  data: {
    type: "groupment";
    attributes?: {
      startDate?: string;
      endDate?: string;
      title?: string;
      /**
       * Can not be set if delivery depends on a `groupment` and `forceAverageDailyPriceExcludingTax` is false
       */
      averageDailyPriceExcludingTax?: number;
      averageDailyCost?: number;
      numberOfDaysInvoicedOrQuantity?: number;
      informationComments?: string;
      loadDistribution?: "manual" | "proportional" | "weighted";
      /**
       * Groupment's deliveries
       */
      deliveries?: {
        /**
         * Delivery on which groupment depends
         */
        delivery: {
          id: string;
          title: string;
          startDate: string;
          endDate: string;
          /**
           * Can not be set if delivery depends on a `groupment` and `forceAverageDailyPriceExcludingTax` is false
           */
          averageDailyPriceExcludingTax?: number;
          averageDailyCost: number;
          additionalTurnoverExcludingTax?: number;
          additionalCostsExcludingTax?: number;
          dependsOn?: {
            id: string;
            firstName: string;
            lastName: string;
          };
          groupment?:
            | {
                data: null;
              }
            | {
                id: string;
              };
          /**
           * Master delivery on which delivery depends
           */
          master?: {
            data: {
              id: string;
            };
          };
          /**
           * Slave delivery on which delivery depends
           */
          slave?: {
            data: {
              id: string;
            };
          };
        };
        weighting: number;
        schedule: number;
      }[];
    };
    relationships: {
      /**
       * Groupment's project
       */
      project: {
        data: {
          id: string;
          type: "project";
        };
      };
    };
  };
}

/**
 * Groupment's basic data sent in the body with a PUT method
 */
export interface SchemasGroupmentsBodyPutJson {
  data: {
    id: string;
    type: "groupment";
    attributes?: {
      startDate?: string;
      endDate?: string;
      title?: string;
      /**
       * Can not be set if delivery depends on a `groupment` and `forceAverageDailyPriceExcludingTax` is false
       */
      averageDailyPriceExcludingTax?: number;
      averageDailyCost?: number;
      numberOfDaysInvoicedOrQuantity?: number;
      informationComments?: string;
      loadDistribution?: "manual" | "proportional" | "weighted";
      /**
       * Groupment's deliveries
       */
      deliveries?: {
        /**
         * Delivery on which groupment depends
         */
        delivery: {
          id: string;
          title: string;
          startDate: string;
          endDate: string;
          /**
           * Can not be set if delivery depends on a `groupment` and `forceAverageDailyPriceExcludingTax` is false
           */
          averageDailyPriceExcludingTax?: number;
          averageDailyCost: number;
          additionalTurnoverExcludingTax?: number;
          additionalCostsExcludingTax?: number;
          dependsOn?: {
            id: string;
            firstName: string;
            lastName: string;
          };
          groupment?:
            | {
                data: null;
              }
            | {
                id: string;
              };
          /**
           * Master delivery on which delivery depends
           */
          master?: {
            data: {
              id: string;
            };
          };
          /**
           * Slave delivery on which delivery depends
           */
          slave?: {
            data: {
              id: string;
            };
          };
        };
        weighting: number;
        schedule: number;
      }[];
    };
  };
}


// ─── tasks ───
/**
 * Task data
 */
export interface SchemasTasksProfileJson {
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
    type: "task";
    attributes?: {
      description?: string;
      row?: number;
      state?: boolean;
      validatedAt?: number;
      validatedBy?: {
        id?: string;
        firstName?: string;
        lastName?: string;
      };
    };
    relationships?: {
      /**
       * List of children tasks
       */
      children?: {
        data: {
          id: string;
          type: "task";
        }[];
      };
      /**
       * Task's todolist
       */
      todolist?: {
        data: {
          id: string;
          type: "todolist";
        }[];
      };
      dependsOn?:
        | {
            data: {
              id: string;
              type: "candidate";
            };
          }
        | {
            data: {
              id: string;
              type: "company";
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
              type: "contract";
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
              type: "resource";
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
              type: "opportunity";
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
              type: "positioning";
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
              type: "order";
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
              type: "quotation";
            };
          }
        | {
            data: {
              id: string;
              type: "appentity";
            };
          };
    };
  };
  uniqueItems?: unknown;
}


// ─── downloadCenter ───
/**
 * List of folders
 */
export interface SchemasDownloadCenterProfileJson {
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
    type: "downloadcenterfolder";
    attributes?: {
      name?: string;
      urlVisitor?: string;
      /**
       * Folder is locked when an operation is occuring
       */
      isLocked?: boolean;
      /**
       * File is temporary
       */
      isTemporary?: boolean;
      /**
       * Folder has an available zip archive containing all its files
       */
      hasArchive?: boolean;
      /**
       * Folder contains too many files to list and display them all, use folder archive download feature
       */
      hasTooManyFiles?: boolean;
      /**
       * Number of files inside the folder
       */
      filesCount?: number;
    };
    relationships?: {
      /**
       * List of files
       */
      files?: {
        data: {
          id: string;
          type: "downloadcenterfile";
        }[];
      };
    };
  }[];
  included?: {
    id: string;
    type: "downloadcenterfile";
    attributes?: {
      name?: string;
    };
  }[];
}

/**
 * List of files
 */
export interface SchemasDownloadCenterFolderJson {
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
    type: "downloadcenterfolder";
    attributes?: {
      name?: string;
      urlVisitor?: string;
    };
    relationships?: {
      /**
       * List of files
       */
      files?: {
        data: {
          id: string;
          type: "downloadcenterfile";
        }[];
      };
    };
  };
  included?: {
    id: string;
    type: "downloadcenterfile";
    attributes?: {
      name?: string;
    };
  }[];
}


// ─── standardProfiles ───
/**
 * List of standard profiles
 */
export interface SchemasStandardProfilesSearchJson {
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
    type: "standardprofile";
    attributes?: {
      creationDate?: string;
      title?: string;
      dailyCostExcludingTax?: number;
      dailyPriceExcludingTax?: number;
      informationComments?: string;
      skills?: string;
      currency?: number;
      exchangeRate?: number;
      currencyAgency?: number;
      exchangeRateAgency?: number;
    };
    relationships?: {
      /**
       * Standard profile's agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
        };
      };
    };
  }[];
  included?: {
    data: {
      id: string;
      type: "agency";
    };
  }[];
}

/**
 * Standard Profile's basic data
 */
export interface SchemasStandardProfilesProfileJson {
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
    type: "standardprofile";
    attributes?: {
      creationDate?: string;
      title?: string;
      dailyCostExcludingTax?: number;
      dailyPriceExcludingTax?: number;
      informationComments?: string;
      skills?: string;
      currency?: number;
      exchangeRate?: number;
      currencyAgency?: number;
      exchangeRateAgency?: number;
    };
    relationships?: {
      /**
       * Standard profile's agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
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
    };
  };
  included?: {
    id: string;
    type: "agency";
    attributes?: {
      name?: string;
    };
  }[];
}

/**
 * Empty standard profile's basic data
 */
export interface SchemasStandardProfilesDefaultJson {
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
    id: "0";
    type: "standardprofile";
    attributes?: {
      creationDate?: string;
      title?: string;
      dailyCostExcludingTax?: number;
      dailyPriceExcludingTax?: number;
      informationComments?: string;
      skills?: string;
      currency?: number;
      exchangeRate?: number;
      currencyAgency?: number;
      exchangeRateAgency?: number;
    };
    relationships?: {
      /**
       * Standard profile's agency
       */
      agency?: {
        data: {
          id: string;
          type: "agency";
        };
      };
    };
  };
  included?: {
    id: string;
    type: "agency";
    attributes?: {
      name?: string;
    };
  }[];
}

/**
 * Standard profiles rights
 */
export interface SchemasStandardProfilesRightsJson {
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
        agency?: {
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
 * Standard Profile's information data sent in the body with a POST method
 */
export interface SchemasStandardProfilesBodyPostJson {
  data: {
    type: "standardprofile";
    attributes?: {
      creationDate?: string;
      title?: string;
      dailyCostExcludingTax?: number;
      dailyPriceExcludingTax?: number;
      informationComments?: string;
      skills?: string;
      currency?: number;
      exchangeRate?: number;
      currencyAgency?: number;
      exchangeRateAgency?: number;
    };
    relationships?: {
      /**
       * Standard Profile's agency
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
 * Standard Profile's information data sent in the body with a PUT method
 */
export interface SchemasStandardProfilesBodyPutJson {
  data: {
    type: "standardprofile";
    attributes?: {
      creationDate?: string;
      title?: string;
      dailyCostExcludingTax?: number;
      dailyPriceExcludingTax?: number;
      informationComments?: string;
      skills?: string;
      currency?: number;
      exchangeRate?: number;
      currencyAgency?: number;
      exchangeRateAgency?: number;
    };
    relationships?: {
      /**
       * Standard Profile's agency
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


// ─── followedDocuments ───
/**
 * Data of Document to follow
 */
export interface SchemasFollowedDocumentsProfileJson {
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
    type: "followeddocument";
    attributes?: {
      typeOf?: number;
      /**
       * If 1 then document to follow is followed
       */
      state?: number;
      issuedDate?: string;
      expirationDate?: string;
      description?: string;
      creationDate?: string;
      updateDate?: string;
      /**
       * number of attachments
       */
      numberOfFiles?: number;
      /**
       * If false then document to follow is not accessible
       */
      canReadFollowedDocument?: boolean;
      /**
       * If false then document to follow is editable
       */
      canWriteFollowedDocument?: boolean;
    };
    relationships?: {
      dependsOn?: {
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
       * List of files
       */
      files?: {
        data: {
          id: string;
          type: "document";
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
          type: "agency";
          attributes?: {
            name?: string;
          };
        }
      | {
          id: string;
          type: "resource";
          attributes?: {
            firstName?: string;
            lastName?: string;
          };
          relationships?: {};
        }
      | {
          id: string;
          type: "document";
          attributes?: {
            name?: string;
          };
        }
    ),
    ...(
      | {
          id: string;
          type: "agency";
          attributes?: {
            name?: string;
          };
        }
      | {
          id: string;
          type: "resource";
          attributes?: {
            firstName?: string;
            lastName?: string;
          };
          relationships?: {};
        }
      | {
          id: string;
          type: "document";
          attributes?: {
            name?: string;
          };
        }
    )[]
  ];
}

/**
 * Empty document to follow default basic data
 */
export interface SchemasFollowedDocumentsDefaultJson {
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
    id: "0";
    type: "followeddocument";
    attributes?: {
      typeOf?: number;
      /**
       * If 1 then document to follow is followed
       */
      state?: number;
      issuedDate?: string;
      expirationDate?: string;
      description?: string;
    };
    relationships: {
      dependsOn: {
        data: {
          id: string;
          type: "resource";
        };
      };
    };
  };
  /**
   * @minItems 1
   */
  included?: [
    {
      id: string;
      type: "resource";
      attributes?: {
        firstName?: string;
        lastName?: string;
      };
    },
    ...{
      id: string;
      type: "resource";
      attributes?: {
        firstName?: string;
        lastName?: string;
      };
    }[]
  ];
}

/**
 * Documents to follow rights
 */
export interface SchemasFollowedDocumentsRightsJson {
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
    };
  };
}

/**
 * Data of Document to follow sent in the body with a POST method
 */
export interface SchemasFollowedDocumentsBodyPostJson {
  data: {
    type: "followeddocument";
    attributes?: {
      typeOf: number;
      /**
       * If 1 then document to follow is followed
       */
      state?: number;
      issuedDate?: string;
      expirationDate: string;
      description?: string;
    };
    relationships: {
      dependsOn: {
        data: {
          id: string;
          type: "resource";
        };
      };
    };
  };
}

/**
 * Data of Document to follow sent in the body with a PUT method
 */
export interface SchemasFollowedDocumentsBodyPutJson {
  data: {
    id: string;
    type: "followeddocument";
    attributes?: {
      typeOf?: number;
      /**
       * If 1 then document to follow is followed
       */
      state?: number;
      issuedDate?: string;
      expirationDate?: string;
      description?: string;
    };
  };
}


// ─── conditionalFields ───
/**
 * List of conditional fields. When display=cards, totals.rows represents the number of cards (groups) instead of individual items.
 */
export interface SchemasConditionalFieldsSearchJson {
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
     * List of modules pending shield reset/synchronization
     */
    conditionalFieldsNotSynchronized?: ("opportunities" | "candidates" | "contacts" | "companies" | "positionings")[];
  };
  data: {
    id: string;
    type: "conditionalfield";
    attributes?: {
      /**
       * Target module for this conditional field rule
       */
      module?: "opportunities" | "candidates" | "contacts" | "companies" | "positionings";
      /**
       * Target attribute name that this rule applies to
       */
      attribute?: string;
      /**
       * Array of state IDs for which this rule applies (empty = all states)
       */
      states?: number[];
      /**
       * Array of type IDs for which this rule applies (empty = all types)
       */
      typesOf?: number[];
      /**
       * Criteria settings for this rule
       */
      criteria?: {
        /**
         * Validation level: required or recommended
         */
        level: "required" | "recommended";
        /**
         * If true, this conditional field rule is ignored when creating a new entity
         */
        ignoreOnCreation: boolean;
        /**
         * Minimum value (optional, for numeric fields)
         */
        min?: number;
      };
    };
    relationships?: {
      /**
       * Agencies to which this rule applies
       */
      agencies?: {
        data: {
          id: string;
          type: "agency";
        }[];
      };
    };
  }[];
  included?: {
    id: string;
    type: "agency";
    attributes?: {
      name?: string;
    };
  }[];
}

/**
 * Conditional field's basic data
 */
export interface SchemasConditionalFieldsProfileJson {
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
    type: "conditionalfield";
    attributes?: {
      /**
       * Target module for this conditional field rule
       */
      module?: "opportunities" | "candidates" | "contacts" | "companies" | "positionings";
      /**
       * Target attribute name that this rule applies to
       */
      attribute?: string;
      /**
       * Array of state IDs for which this rule applies (empty = all states)
       */
      states?: number[];
      /**
       * Array of type IDs for which this rule applies (empty = all types)
       */
      typesOf?: number[];
      /**
       * Criteria settings for this rule
       */
      criteria?: {
        /**
         * Validation level: required or recommended
         */
        level: "required" | "recommended";
        /**
         * If true, this conditional field rule is ignored when creating a new entity
         */
        ignoreOnCreation: boolean;
        /**
         * Minimum value (optional, for numeric fields)
         */
        min?: number;
      };
    };
    relationships?: {
      /**
       * Agencies to which this rule applies
       */
      agencies?: {
        data: {
          id: string;
          type: "agency";
        }[];
      };
    };
  };
  included?: {
    id: string;
    type: "agency";
    attributes?: {
      name?: string;
    };
  }[];
}

/**
 * Empty conditional field's default data
 */
export interface SchemasConditionalFieldsDefaultJson {
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
    id: "0";
    type: "conditionalfield";
    attributes?: {
      /**
       * Target module for this conditional field rule
       */
      module?: "opportunities" | "candidates" | "contacts" | "companies" | "positionings";
      /**
       * Target attribute name that this rule applies to
       */
      attribute?: string;
      /**
       * Array of state IDs for which this rule applies (empty = all states)
       */
      states?: number[];
      /**
       * Array of type IDs for which this rule applies (empty = all types)
       */
      typesOf?: number[];
      /**
       * Criteria settings for this rule
       */
      criteria?: {
        /**
         * Validation level: required or recommended
         */
        level: "required" | "recommended";
        /**
         * If true, this conditional field rule is ignored when creating a new entity
         */
        ignoreOnCreation: boolean;
        /**
         * Minimum value (optional, for numeric fields)
         */
        min?: number;
      };
    };
    relationships?: {
      /**
       * Agencies to which this rule applies
       */
      agencies?: {
        data: {
          id: string;
          type: "agency";
        }[];
      };
    };
  };
}

/**
 * Conditional field's data sent in the body with a POST method
 */
export interface SchemasConditionalFieldsBodyPostJson {
  data: {
    type: "conditionalfield";
    attributes: {
      /**
       * Target module for this conditional field rule
       */
      module: "opportunities" | "candidates" | "contacts" | "companies" | "positionings";
      /**
       * Target attribute name that this rule applies to
       */
      attribute: string;
      /**
       * Array of state IDs for which this rule applies (empty = all states)
       */
      states?: number[];
      /**
       * Array of type IDs for which this rule applies (empty = all types)
       */
      typesOf?: number[];
      /**
       * Criteria settings for this rule
       */
      criteria?: {
        /**
         * Validation level: required or recommended
         */
        level: "required" | "recommended";
        /**
         * If true, this conditional field rule is ignored when creating a new entity
         */
        ignoreOnCreation: boolean;
        /**
         * Minimum value (optional, for numeric fields)
         */
        min?: number;
      };
    };
    relationships?: {
      /**
       * Agencies to which this rule applies
       */
      agencies?: {
        data: {
          id: string;
          type: "agency";
        }[];
      };
    };
  };
}

/**
 * Conditional field's data sent in the body with a PUT method
 */
export interface SchemasConditionalFieldsBodyPutJson {
  data: {
    id: string;
    type: "conditionalfield";
    attributes?: {
      /**
       * Target module for this conditional field rule
       */
      module?: "opportunities" | "candidates" | "contacts" | "companies" | "positionings";
      /**
       * Target attribute name that this rule applies to
       */
      attribute?: string;
      /**
       * Array of state IDs for which this rule applies (empty = all states)
       */
      states?: number[];
      /**
       * Array of type IDs for which this rule applies (empty = all types)
       */
      typesOf?: number[];
      /**
       * Criteria settings for this rule
       */
      criteria?: {
        /**
         * Validation level: required or recommended
         */
        level: "required" | "recommended";
        /**
         * If true, this conditional field rule is ignored when creating a new entity
         */
        ignoreOnCreation: boolean;
        /**
         * Minimum value (optional, for numeric fields)
         */
        min?: number;
      };
    };
    relationships?: {
      /**
       * Agencies to which this rule applies
       */
      agencies?: {
        data: {
          id: string;
          type: "agency";
        }[];
      };
    };
  };
}


// ─── technicalDatas ───
/**
 * Technical data's profile
 */
export interface SchemasTechnicalDatasProfileJson {
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
    type: "technicaldata";
    attributes: {
      updateDate?: string;
      title?: string;
      description?: string;
      isReferent?: boolean;
      /**
       * Public link of Technical Data profile
       */
      tdLink?: string;
      summary?: string;
      skills?: string;
      experience?: number;
      training?: string;
      languages?: {
        language: string;
        /**
         * Language level {id}
         */
        level: string;
      }[];
      diplomas?: string[];
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
      activityAreas?: string[];
      expertiseAreas?: string[];
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
      }[];
    };
    relationships?: {
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
          thumbnail?: string;
          email1?: string;
          phone1?: string;
        };
      }
    | {
        id: string;
        type: "resource";
        attributes?: {
          initials?: string;
          firstName?: string;
          lastName?: string;
          town?: string;
          country?: string;
          availability?: string;
          resourceCanModifyTechnicalData?: boolean;
          numberOfResumes?: number;
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
                }
              ]
            | [
                {
                  network: "facebook" | "viadeo" | "linkedin" | "x";
                  url: string;
                },
                {
                  network: "facebook" | "viadeo" | "linkedin" | "x";
                  url: string;
                }
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
                }
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
                }
              ];
        };
        relationships?: {
          /**
           * Technical data dependsOn's agency
           */
          agency?: {
            data: {
              id: string;
              type: "agency";
            };
          };
          /**
           * Technical data's dependsOn's main manager
           */
          mainManager?: {
            data: {
              id: string;
              type: "resource";
            };
          };
        };
      }
    | {
        id: string;
        type: "candidate";
        attributes?: {
          initials?: string;
          firstName?: string;
          lastName?: string;
          town?: string;
          country?: string;
          availability?: number | string;
          numberOfResumes?: number;
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
                }
              ]
            | [
                {
                  network: "facebook" | "viadeo" | "linkedin" | "x";
                  url: string;
                },
                {
                  network: "facebook" | "viadeo" | "linkedin" | "x";
                  url: string;
                }
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
                }
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
                }
              ];
        };
        relationships?: {
          /**
           * Technical data dependsOn's agency
           */
          agency?: {
            data: {
              id: string;
              type: "agency";
            };
          };
          /**
           * Technical data's dependsOn's main manager
           */
          mainManager?: {
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
          code?: string;
          /**
           * Customer's absolute logo url
           */
          groupLogo?: string;
          /**
           * Sidebar color in hexadecimal format
           */
          technicalDataSidebarColor?: string;
          /**
           * Contact color in hexadecimal format
           */
          technicalDataContactColor?: string;
          /**
           * Title color in hexadecimal format
           */
          technicalDataTitleColor?: string;
          /**
           * Sidebar text color in hexadecimal format (#000000 for black, #FFFFFF for white)
           */
          technicalDataSidebarTextColor?: string;
          /**
           * Contact text color in hexadecimal format (#000000 for black, #FFFFFF for white)
           */
          technicalDataContactTextColor?: string;
          /**
           * Technical data logo
           */
          technicalDataLogo?: string;
          /**
           * Font family
           */
          technicalDataFontFamily?: string;
        };
      }
  )[];
}

/**
 * Empty technical data's basic data
 */
export interface SchemasTechnicalDatasDefaultJson {
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
    ai?: {
      /**
       * Number of AI requests left
       */
      quota?: number;
    };
    /**
     * Parsing engine used to parse the resume (james_ai, hrflow, mindee, etc.)
     */
    parsingEngine?: string | null;
  };
  data: {
    id: "0";
    type: "technicaldata";
    attributes?: {
      title?: string;
      description?: string;
      isReferent?: boolean;
      summary?: string;
      skills?: string;
      experience?: number;
      training?: string;
      languages?: {
        language: string;
        /**
         * Language level {id}
         */
        level: string;
      }[];
      diplomas?: string[];
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
      activityAreas?: string[];
      expertiseAreas?: string[];
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
      }[];
      /**
       * Indicates if the technical data was created from a resume
       */
      createdFromResume?: boolean;
    };
    relationships?: {
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
          thumbnail?: string;
          email1?: string;
          phone1?: string;
        };
      }
    | {
        id: string;
        type: "resource";
        attributes?: {
          firstName?: string;
          lastName?: string;
          town?: string;
          country?: string;
          availability?: string;
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
                }
              ]
            | [
                {
                  network: "facebook" | "viadeo" | "linkedin" | "x";
                  url: string;
                },
                {
                  network: "facebook" | "viadeo" | "linkedin" | "x";
                  url: string;
                }
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
                }
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
                }
              ];
        };
      }
    | {
        id: string;
        type: "candidate";
        attributes?: {
          firstName?: string;
          lastName?: string;
          town?: string;
          country?: string;
          availability?: number | string;
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
                }
              ]
            | [
                {
                  network: "facebook" | "viadeo" | "linkedin" | "x";
                  url: string;
                },
                {
                  network: "facebook" | "viadeo" | "linkedin" | "x";
                  url: string;
                }
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
                }
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
                }
              ];
        };
      }
    | {
        id: string;
        type: "agency";
        attributes?: {
          name?: string;
          code?: string;
          /**
           * Customer's absolute logo url
           */
          groupLogo?: string;
          /**
           * Sidebar color in hexadecimal format
           */
          technicalDataSidebarColor?: string;
          /**
           * Contact color in hexadecimal format
           */
          technicalDataContactColor?: string;
          /**
           * Title color in hexadecimal format
           */
          technicalDataTitleColor?: string;
          /**
           * Sidebar text color in hexadecimal format (#000000 for black, #FFFFFF for white)
           */
          technicalDataSidebarTextColor?: string;
          /**
           * Contact text color in hexadecimal format (#000000 for black, #FFFFFF for white)
           */
          technicalDataContactTextColor?: string;
          /**
           * Technical data logo
           */
          technicalDataLogo?: string;
          /**
           * Font family
           */
          technicalDataFontFamily?: string;
        };
      }
  )[];
}

/**
 * Technical data's sent in the body with a POST method
 */
export interface SchemasTechnicalDatasBodyPostJson {
  data: {
    type: "technicaldata";
    attributes?: {
      title?: string;
      description?: string;
      summary?: string;
      skills?: string;
      experience?: number;
      training?: string;
      languages?: {
        language: string;
        /**
         * Language level {id}
         */
        level: string;
      }[];
      diplomas?: string[];
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
      activityAreas?: string[];
      expertiseAreas?: string[];
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
      }[];
    };
    relationships?: {
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
          };
    };
  };
}

/**
 * Technical data's sent in the body with a PUT method
 */
export interface SchemasTechnicalDatasBodyPutJson {
  data: {
    type: "technicaldata";
    attributes?: {
      title?: string;
      description?: string;
      summary?: string;
      skills?: string;
      experience?: number;
      training?: string;
      languages?: {
        language: string;
        /**
         * Language level {id}
         */
        level: string;
      }[];
      diplomas?: string[];
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
      activityAreas?: string[];
      expertiseAreas?: string[];
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
      }[];
      isReferent?: boolean;
      /**
       * true to create public link of technical data profile
       */
      createLink?: boolean;
      /**
       * true to delete public link of technical data profile
       */
      deleteLink?: boolean;
      resourceCanModifyTechnicalData?: boolean;
    };
    relationships?: {
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
          };
    };
  };
}

/**
 * Technical data's sent in the body with a PUT method
 */
export interface SchemasTechnicalDatasResumeBodyPutJson {
  data: {
    type: "technicaldata";
    attributes?: {
      resume?: string;
    };
  };
}

/**
 * Public Technical File
 */
export interface SchemasTechnicalDatasVisitorAccessJson {
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
    availabilityTypes?: {
      id?: number;
      isEnabled?: boolean;
      value?: string;
    }[];
    availableTools?: {
      id?: string;
      isEnabled?: boolean;
      value?: string;
    }[];
    languageLevel?: {
      id?: string;
      isEnabled?: boolean;
      value?: string;
    }[];
    languageSpoken?: {
      id?: string;
      isEnabled?: boolean;
      value?: string;
    }[];
    activityArea?: {
      id?: string;
      option?: {
        id?: string;
        isEnabled?: boolean;
        value?: string;
      }[];
      isEnabled?: boolean;
      value?: string;
    }[];
  };
  data: {
    id: string;
    type: "technicaldata";
    attributes: {
      title?: string;
      summary?: string;
      skills?: string;
      experience?: number;
      training?: string;
      languages?: {
        language: string;
        /**
         * Language level {id}
         */
        level: string;
      }[];
      diplomas?: string[];
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
      activityAreas?: string[];
      expertiseAreas?: string[];
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
      }[];
    };
    relationships?: {
      dependsOn?:
        | {
            data: {
              id: string;
              type: "resource";
              attributes?: {
                town?: string;
                country?: string;
                availability?: string;
                initials?: string;
              };
            };
          }
        | {
            data: {
              id: string;
              type: "candidate";
              attributes?: {
                town?: string;
                country?: string;
                availability?: number | string;
                initials?: string;
              };
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
              type: "agency";
            };
          };
    };
  };
  included?: {
    id: string;
    type: "agency";
    attributes?: {
      /**
       * Customer's absolute logo url
       */
      groupLogo?: string;
      /**
       * Sidebar color in hexadecimal format
       */
      technicalDataSidebarColor?: string;
      /**
       * Contact color in hexadecimal format
       */
      technicalDataContactColor?: string;
      /**
       * Title color in hexadecimal format
       */
      technicalDataTitleColor?: string;
      /**
       * Sidebar text color in hexadecimal format (#000000 for black, #FFFFFF for white)
       */
      technicalDataSidebarTextColor?: string;
      /**
       * Contact text color in hexadecimal format (#000000 for black, #FFFFFF for white)
       */
      technicalDataContactTextColor?: string;
      /**
       * Technical data logo
       */
      technicalDataLogo?: string;
      /**
       * Font family
       */
      technicalDataFontFamily?: string;
    };
  }[];
}


// ─── invoicingConnections ───
/**
 * List of invoicing connectors
 */
export interface SchemasInvoicingConnectionsSearchJson {
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
    type: "invoicingconnection";
    attributes?: {
      code?: string;
      name?: string;
      country?: string;
      taxNumber?: string;
      cinNumber?: string;
      cinScheme?: string;
      /**
       * true if connector is validated
       */
      validated?: boolean;
      /**
       * true if connector is disabled
       */
      disabled?: boolean;
      /**
       * true if reception is enabled (purchase module enable for this customer
       */
      canEnableReception?: boolean;
      /**
       * List of channels
       */
      channels?: {
        code?: string;
        typeOf?: string;
        configuration?: {
          [k: string]: unknown;
        };
        /**
         * true if connector is disabled
         */
        disabled?: boolean;
        /**
         * true if connector is validated
         */
        validated?: boolean;
      }[];
    };
    relationships?: {
      /**
       * Connector agencies
       */
      agencies?: {
        data: {
          id: string;
          type: "agency";
        }[];
      };
    };
  }[];
  included?: {
    id: string;
    type: "agency";
    attributes?: {
      name?: string;
    };
  }[];
}

/**
 * Invoicing connector basic data
 */
export interface SchemasInvoicingConnectionsProfileJson {
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
    type: "invoicingconnection";
    attributes?: {
      code?: string;
      taxNumber?: string;
      cinNumber?: string;
      cinScheme?: string;
      name?: string;
      address?: string;
      postcode?: string;
      town?: string;
      province?: string;
      country?: string;
      email?: string;
      phone?: string;
      /**
       * true if connector is validated
       */
      validated?: boolean;
      /**
       * true if connector is disabled
       */
      disabled?: boolean;
      /**
       * List of channels
       */
      channels?: {
        code?: string;
        typeOf?: string;
        configuration?: {
          [k: string]: unknown;
        };
        /**
         * true if connector is disabled
         */
        disabled?: boolean;
        /**
         * true if connector is validated
         */
        validated?: boolean;
      }[];
      /**
       * true if reception is enabled (purchase module enable for this customer
       */
      canEnableReception?: boolean;
    };
    relationships?: {
      /**
       * Connector agencies
       */
      agencies?: {
        data: {
          id: string;
          type: "agency";
        }[];
      };
    };
  };
  included?: {
    id: string;
    type: "agency";
    attributes?: {
      name?: string;
    };
  }[];
}

/**
 * Invoicing connector data sent in the body with a PUT method
 */
export interface SchemasInvoicingConnectionsBodyPostJson {
  data: {
    id: string;
    type: "invoicingconnection";
    attributes?: {
      name: string;
      code: string;
      taxNumber: string;
      address: string;
      postcode: string;
      town: string;
      country: string;
      province: string;
      email: string;
      phone: string;
      /**
       * true if connector is disabled
       */
      disabled?: boolean;
      /**
       * List of channels
       */
      channels: {
        code?: string;
        typeOf?: string;
        configuration?: {
          [k: string]: unknown;
        };
        /**
         * true if connector is disabled
         */
        disabled?: boolean;
        /**
         * true if connector is validated
         */
        validated?: boolean;
      }[];
    };
    relationships?: {
      /**
       * Invoicing connector's agencies
       */
      agencies: {
        data: {
          id: string;
          type: "agency";
        }[];
      };
    };
  };
}

/**
 * Invoicing connector data sent in the body with a PUT method
 */
export interface SchemasInvoicingConnectionsBodyPutJson {
  data: {
    id: string;
    type: "invoicingconnection";
    attributes?: {
      name: string;
      address: string;
      postcode: string;
      town: string;
      country: string;
      province: string;
      email: string;
      phone: string;
      /**
       * true if connector is disabled
       */
      disabled?: boolean;
    };
    relationships?: {
      /**
       * Invoicing connector's agencies
       */
      agencies: {
        data: {
          id: string;
          type: "agency";
        }[];
      };
    };
  };
}

