"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
const fhir_1 = require("./fhir");
const constants_1 = require("./constants");
class ParseConformance {
    constructor(loadCached, version) {
        this.structureDefinitions = [];
        this.parsedStructureDefinitions = loadCached ? require('./profiles/types.json') : {};
        this.parsedValueSets = loadCached ? require('./profiles/valuesets.json') : {};
        this.version = version || fhir_1.Versions.R4;
        this.codeSystems = [];
        this.ensurePropertyMetaData();
    }
    isBaseProfile(url) {
        let urls;
        switch (this.version) {
            case fhir_1.Versions.STU3:
                urls = ['http://hl7.org/fhir/StructureDefinition/Account', 'http://hl7.org/fhir/StructureDefinition/ActivityDefinition', 'http://hl7.org/fhir/StructureDefinition/AllergyIntolerance', 'http://hl7.org/fhir/StructureDefinition/AdverseEvent', 'http://hl7.org/fhir/StructureDefinition/Appointment', 'http://hl7.org/fhir/StructureDefinition/AppointmentResponse', 'http://hl7.org/fhir/StructureDefinition/AuditEvent', 'http://hl7.org/fhir/StructureDefinition/Basic', 'http://hl7.org/fhir/StructureDefinition/Binary', 'http://hl7.org/fhir/StructureDefinition/BodySite', 'http://hl7.org/fhir/StructureDefinition/Bundle', 'http://hl7.org/fhir/StructureDefinition/CapabilityStatement', 'http://hl7.org/fhir/StructureDefinition/CarePlan', 'http://hl7.org/fhir/StructureDefinition/CareTeam', 'http://hl7.org/fhir/StructureDefinition/ChargeItem', 'http://hl7.org/fhir/StructureDefinition/Claim', 'http://hl7.org/fhir/StructureDefinition/ClaimResponse', 'http://hl7.org/fhir/StructureDefinition/ClinicalImpression', 'http://hl7.org/fhir/StructureDefinition/CodeSystem', 'http://hl7.org/fhir/StructureDefinition/Communication', 'http://hl7.org/fhir/StructureDefinition/CommunicationRequest', 'http://hl7.org/fhir/StructureDefinition/CompartmentDefinition', 'http://hl7.org/fhir/StructureDefinition/Composition', 'http://hl7.org/fhir/StructureDefinition/ConceptMap', 'http://hl7.org/fhir/StructureDefinition/Condition (aka Problem)', 'http://hl7.org/fhir/StructureDefinition/Consent', 'http://hl7.org/fhir/StructureDefinition/Contract', 'http://hl7.org/fhir/StructureDefinition/Coverage', 'http://hl7.org/fhir/StructureDefinition/DataElement', 'http://hl7.org/fhir/StructureDefinition/DetectedIssue', 'http://hl7.org/fhir/StructureDefinition/Device', 'http://hl7.org/fhir/StructureDefinition/DeviceComponent', 'http://hl7.org/fhir/StructureDefinition/DeviceMetric', 'http://hl7.org/fhir/StructureDefinition/DeviceRequest', 'http://hl7.org/fhir/StructureDefinition/DeviceUseStatement', 'http://hl7.org/fhir/StructureDefinition/DiagnosticReport', 'http://hl7.org/fhir/StructureDefinition/DocumentManifest', 'http://hl7.org/fhir/StructureDefinition/DocumentReference', 'http://hl7.org/fhir/StructureDefinition/EligibilityRequest', 'http://hl7.org/fhir/StructureDefinition/EligibilityResponse', 'http://hl7.org/fhir/StructureDefinition/Encounter', 'http://hl7.org/fhir/StructureDefinition/Endpoint', 'http://hl7.org/fhir/StructureDefinition/EnrollmentRequest', 'http://hl7.org/fhir/StructureDefinition/EnrollmentResponse', 'http://hl7.org/fhir/StructureDefinition/EpisodeOfCare', 'http://hl7.org/fhir/StructureDefinition/ExpansionProfile', 'http://hl7.org/fhir/StructureDefinition/ExplanationOfBenefit', 'http://hl7.org/fhir/StructureDefinition/FamilyMemberHistory', 'http://hl7.org/fhir/StructureDefinition/Flag', 'http://hl7.org/fhir/StructureDefinition/Goal', 'http://hl7.org/fhir/StructureDefinition/GraphDefinition', 'http://hl7.org/fhir/StructureDefinition/Group', 'http://hl7.org/fhir/StructureDefinition/GuidanceResponse', 'http://hl7.org/fhir/StructureDefinition/HealthcareService', 'http://hl7.org/fhir/StructureDefinition/ImagingManifest', 'http://hl7.org/fhir/StructureDefinition/ImagingStudy', 'http://hl7.org/fhir/StructureDefinition/Immunization', 'http://hl7.org/fhir/StructureDefinition/ImmunizationRecommendation', 'http://hl7.org/fhir/StructureDefinition/ImplementationGuide', 'http://hl7.org/fhir/StructureDefinition/Library', 'http://hl7.org/fhir/StructureDefinition/Linkage', 'http://hl7.org/fhir/StructureDefinition/List', 'http://hl7.org/fhir/StructureDefinition/Location', 'http://hl7.org/fhir/StructureDefinition/Measure', 'http://hl7.org/fhir/StructureDefinition/MeasureReport', 'http://hl7.org/fhir/StructureDefinition/Media', 'http://hl7.org/fhir/StructureDefinition/Medication', 'http://hl7.org/fhir/StructureDefinition/MedicationAdministration', 'http://hl7.org/fhir/StructureDefinition/MedicationDispense', 'http://hl7.org/fhir/StructureDefinition/MedicationRequest', 'http://hl7.org/fhir/StructureDefinition/MedicationStatement', 'http://hl7.org/fhir/StructureDefinition/MessageDefinition', 'http://hl7.org/fhir/StructureDefinition/MessageHeader', 'http://hl7.org/fhir/StructureDefinition/NamingSystem', 'http://hl7.org/fhir/StructureDefinition/NutritionOrder', 'http://hl7.org/fhir/StructureDefinition/Observation', 'http://hl7.org/fhir/StructureDefinition/OperationDefinition', 'http://hl7.org/fhir/StructureDefinition/OperationOutcome', 'http://hl7.org/fhir/StructureDefinition/Organization', 'http://hl7.org/fhir/StructureDefinition/Parameters', 'http://hl7.org/fhir/StructureDefinition/Patient', 'http://hl7.org/fhir/StructureDefinition/PaymentNotice', 'http://hl7.org/fhir/StructureDefinition/PaymentReconciliation', 'http://hl7.org/fhir/StructureDefinition/Person', 'http://hl7.org/fhir/StructureDefinition/PlanDefinition', 'http://hl7.org/fhir/StructureDefinition/Practitioner', 'http://hl7.org/fhir/StructureDefinition/PractitionerRole', 'http://hl7.org/fhir/StructureDefinition/Procedure', 'http://hl7.org/fhir/StructureDefinition/ProcedureRequest', 'http://hl7.org/fhir/StructureDefinition/ProcessRequest', 'http://hl7.org/fhir/StructureDefinition/ProcessResponse', 'http://hl7.org/fhir/StructureDefinition/Provenance', 'http://hl7.org/fhir/StructureDefinition/Questionnaire', 'http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse', 'http://hl7.org/fhir/StructureDefinition/ReferralRequest', 'http://hl7.org/fhir/StructureDefinition/RelatedPerson', 'http://hl7.org/fhir/StructureDefinition/RequestGroup', 'http://hl7.org/fhir/StructureDefinition/ResearchStudy', 'http://hl7.org/fhir/StructureDefinition/ResearchSubject', 'http://hl7.org/fhir/StructureDefinition/RiskAssessment', 'http://hl7.org/fhir/StructureDefinition/Schedule', 'http://hl7.org/fhir/StructureDefinition/SearchParameter', 'http://hl7.org/fhir/StructureDefinition/Sequence', 'http://hl7.org/fhir/StructureDefinition/ServiceDefinition', 'http://hl7.org/fhir/StructureDefinition/Slot', 'http://hl7.org/fhir/StructureDefinition/Specimen', 'http://hl7.org/fhir/StructureDefinition/StructureDefinition', 'http://hl7.org/fhir/StructureDefinition/StructureMap', 'http://hl7.org/fhir/StructureDefinition/Subscription', 'http://hl7.org/fhir/StructureDefinition/Substance', 'http://hl7.org/fhir/StructureDefinition/SupplyDelivery', 'http://hl7.org/fhir/StructureDefinition/SupplyRequest', 'http://hl7.org/fhir/StructureDefinition/Task', 'http://hl7.org/fhir/StructureDefinition/TestScript', 'http://hl7.org/fhir/StructureDefinition/TestReport', 'http://hl7.org/fhir/StructureDefinition/ValueSet', 'http://hl7.org/fhir/StructureDefinition/VisionPrescription'];
                break;
            case fhir_1.Versions.R4:
                urls = ['http://hl7.org/fhir/StructureDefinition/Account', 'http://hl7.org/fhir/StructureDefinition/ActivityDefinition', 'http://hl7.org/fhir/StructureDefinition/AdverseEvent', 'http://hl7.org/fhir/StructureDefinition/AllergyIntolerance', 'http://hl7.org/fhir/StructureDefinition/Appointment', 'http://hl7.org/fhir/StructureDefinition/AppointmentResponse', 'http://hl7.org/fhir/StructureDefinition/AuditEvent', 'http://hl7.org/fhir/StructureDefinition/Basic', 'http://hl7.org/fhir/StructureDefinition/Binary', 'http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct', 'http://hl7.org/fhir/StructureDefinition/BodyStructure', 'http://hl7.org/fhir/StructureDefinition/Bundle', 'http://hl7.org/fhir/StructureDefinition/CapabilityStatement', 'http://hl7.org/fhir/StructureDefinition/CarePlan', 'http://hl7.org/fhir/StructureDefinition/CareTeam', 'http://hl7.org/fhir/StructureDefinition/CatalogEntry', 'http://hl7.org/fhir/StructureDefinition/ChargeItem', 'http://hl7.org/fhir/StructureDefinition/ChargeItemDefinition', 'http://hl7.org/fhir/StructureDefinition/Claim', 'http://hl7.org/fhir/StructureDefinition/ClaimResponse', 'http://hl7.org/fhir/StructureDefinition/ClinicalImpression', 'http://hl7.org/fhir/StructureDefinition/CodeSystem', 'http://hl7.org/fhir/StructureDefinition/Communication', 'http://hl7.org/fhir/StructureDefinition/CommunicationRequest', 'http://hl7.org/fhir/StructureDefinition/CompartmentDefinition', 'http://hl7.org/fhir/StructureDefinition/Composition', 'http://hl7.org/fhir/StructureDefinition/ConceptMap', 'http://hl7.org/fhir/StructureDefinition/Condition (aka Problem)', 'http://hl7.org/fhir/StructureDefinition/Consent', 'http://hl7.org/fhir/StructureDefinition/Contract', 'http://hl7.org/fhir/StructureDefinition/Coverage', 'http://hl7.org/fhir/StructureDefinition/CoverageEligibilityRequest', 'http://hl7.org/fhir/StructureDefinition/CoverageEligibilityResponse', 'http://hl7.org/fhir/StructureDefinition/DetectedIssue', 'http://hl7.org/fhir/StructureDefinition/Device', 'http://hl7.org/fhir/StructureDefinition/DeviceDefinition', 'http://hl7.org/fhir/StructureDefinition/DeviceMetric', 'http://hl7.org/fhir/StructureDefinition/DeviceRequest', 'http://hl7.org/fhir/StructureDefinition/DeviceUseStatement', 'http://hl7.org/fhir/StructureDefinition/DiagnosticReport', 'http://hl7.org/fhir/StructureDefinition/DocumentManifest', 'http://hl7.org/fhir/StructureDefinition/DocumentReference', 'http://hl7.org/fhir/StructureDefinition/EffectEvidenceSynthesis', 'http://hl7.org/fhir/StructureDefinition/Encounter', 'http://hl7.org/fhir/StructureDefinition/Endpoint', 'http://hl7.org/fhir/StructureDefinition/EnrollmentRequest', 'http://hl7.org/fhir/StructureDefinition/EnrollmentResponse', 'http://hl7.org/fhir/StructureDefinition/EpisodeOfCare', 'http://hl7.org/fhir/StructureDefinition/EventDefinition', 'http://hl7.org/fhir/StructureDefinition/Evidence', 'http://hl7.org/fhir/StructureDefinition/EvidenceVariable', 'http://hl7.org/fhir/StructureDefinition/ExampleScenario', 'http://hl7.org/fhir/StructureDefinition/ExplanationOfBenefit', 'http://hl7.org/fhir/StructureDefinition/FamilyMemberHistory', 'http://hl7.org/fhir/StructureDefinition/Flag', 'http://hl7.org/fhir/StructureDefinition/Goal', 'http://hl7.org/fhir/StructureDefinition/GraphDefinition', 'http://hl7.org/fhir/StructureDefinition/Group', 'http://hl7.org/fhir/StructureDefinition/GuidanceResponse', 'http://hl7.org/fhir/StructureDefinition/HealthcareService', 'http://hl7.org/fhir/StructureDefinition/ImagingStudy', 'http://hl7.org/fhir/StructureDefinition/Immunization', 'http://hl7.org/fhir/StructureDefinition/ImmunizationEvaluation', 'http://hl7.org/fhir/StructureDefinition/ImmunizationRecommendation', 'http://hl7.org/fhir/StructureDefinition/ImplementationGuide', 'http://hl7.org/fhir/StructureDefinition/InsurancePlan', 'http://hl7.org/fhir/StructureDefinition/Invoice', 'http://hl7.org/fhir/StructureDefinition/Library', 'http://hl7.org/fhir/StructureDefinition/Linkage', 'http://hl7.org/fhir/StructureDefinition/List', 'http://hl7.org/fhir/StructureDefinition/Location', 'http://hl7.org/fhir/StructureDefinition/Measure', 'http://hl7.org/fhir/StructureDefinition/MeasureReport', 'http://hl7.org/fhir/StructureDefinition/Media', 'http://hl7.org/fhir/StructureDefinition/Medication', 'http://hl7.org/fhir/StructureDefinition/MedicationAdministration', 'http://hl7.org/fhir/StructureDefinition/MedicationDispense', 'http://hl7.org/fhir/StructureDefinition/MedicationKnowledge', 'http://hl7.org/fhir/StructureDefinition/MedicationRequest', 'http://hl7.org/fhir/StructureDefinition/MedicationStatement', 'http://hl7.org/fhir/StructureDefinition/MedicinalProduct', 'http://hl7.org/fhir/StructureDefinition/MedicinalProductAuthorization', 'http://hl7.org/fhir/StructureDefinition/MedicinalProductContraindication', 'http://hl7.org/fhir/StructureDefinition/MedicinalProductIndication', 'http://hl7.org/fhir/StructureDefinition/MedicinalProductIngredient', 'http://hl7.org/fhir/StructureDefinition/MedicinalProductInteraction', 'http://hl7.org/fhir/StructureDefinition/MedicinalProductManufactured', 'http://hl7.org/fhir/StructureDefinition/MedicinalProductPackaged', 'http://hl7.org/fhir/StructureDefinition/MedicinalProductPharmaceutical', 'http://hl7.org/fhir/StructureDefinition/MedicinalProductUndesirableEffect', 'http://hl7.org/fhir/StructureDefinition/MessageDefinition', 'http://hl7.org/fhir/StructureDefinition/MessageHeader', 'http://hl7.org/fhir/StructureDefinition/MolecularSequence', 'http://hl7.org/fhir/StructureDefinition/amingSystem', 'http://hl7.org/fhir/StructureDefinition/utritionOrder', 'http://hl7.org/fhir/StructureDefinition/Observation', 'http://hl7.org/fhir/StructureDefinition/ObservationDefinition', 'http://hl7.org/fhir/StructureDefinition/OperationDefinition', 'http://hl7.org/fhir/StructureDefinition/OperationOutcome', 'http://hl7.org/fhir/StructureDefinition/Organization', 'http://hl7.org/fhir/StructureDefinition/OrganizationAffiliation', 'http://hl7.org/fhir/StructureDefinition/Parameters', 'http://hl7.org/fhir/StructureDefinition/Patient', 'http://hl7.org/fhir/StructureDefinition/PaymentNotice', 'http://hl7.org/fhir/StructureDefinition/PaymentReconciliation', 'http://hl7.org/fhir/StructureDefinition/Person', 'http://hl7.org/fhir/StructureDefinition/PlanDefinition', 'http://hl7.org/fhir/StructureDefinition/Practitioner', 'http://hl7.org/fhir/StructureDefinition/PractitionerRole', 'http://hl7.org/fhir/StructureDefinition/Procedure', 'http://hl7.org/fhir/StructureDefinition/Provenance', 'http://hl7.org/fhir/StructureDefinition/Questionnaire', 'http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse', 'http://hl7.org/fhir/StructureDefinition/RelatedPerson', 'http://hl7.org/fhir/StructureDefinition/RequestGroup', 'http://hl7.org/fhir/StructureDefinition/ResearchDefinition', 'http://hl7.org/fhir/StructureDefinition/ResearchElementDefinition', 'http://hl7.org/fhir/StructureDefinition/ResearchStudy', 'http://hl7.org/fhir/StructureDefinition/ResearchSubject', 'http://hl7.org/fhir/StructureDefinition/RiskAssessment', 'http://hl7.org/fhir/StructureDefinition/RiskEvidenceSynthesis', 'http://hl7.org/fhir/StructureDefinition/Schedule', 'http://hl7.org/fhir/StructureDefinition/SearchParameter', 'http://hl7.org/fhir/StructureDefinition/ServiceRequest', 'http://hl7.org/fhir/StructureDefinition/Slot', 'http://hl7.org/fhir/StructureDefinition/Specimen', 'http://hl7.org/fhir/StructureDefinition/SpecimenDefinition', 'http://hl7.org/fhir/StructureDefinition/StructureDefinition', 'http://hl7.org/fhir/StructureDefinition/StructureMap', 'http://hl7.org/fhir/StructureDefinition/Subscription', 'http://hl7.org/fhir/StructureDefinition/Substance', 'http://hl7.org/fhir/StructureDefinition/SubstancePolymer', 'http://hl7.org/fhir/StructureDefinition/SubstanceReferenceInformation', 'http://hl7.org/fhir/StructureDefinition/SubstanceSpecification', 'http://hl7.org/fhir/StructureDefinition/SupplyDelivery', 'http://hl7.org/fhir/StructureDefinition/SupplyRequest', 'http://hl7.org/fhir/StructureDefinition/Task', 'http://hl7.org/fhir/StructureDefinition/TerminologyCapabilities', 'http://hl7.org/fhir/StructureDefinition/TestReport', 'http://hl7.org/fhir/StructureDefinition/TestScript', 'http://hl7.org/fhir/StructureDefinition/ValueSet', 'http://hl7.org/fhir/StructureDefinition/VerificationResult', 'http://hl7.org/fhir/StructureDefinition/VisionPrescription'];
                break;
        }
        return urls.indexOf(url) >= 0;
    }
    ensurePropertyMetaData(properties) {
        if (properties) {
            const primitiveProperties = properties.filter(p => constants_1.Constants.PrimitiveTypes.indexOf(p._type) >= 0);
            for (let primitiveProp of primitiveProperties) {
                const primitivePropIndex = properties.indexOf(primitiveProp);
                let foundMeta = properties.find(p => p._name === "_" + primitiveProp._name);
                if (!foundMeta) {
                    foundMeta = {
                        _name: "_" + primitiveProp._name,
                        _type: "Element",
                        _multiple: false
                    };
                    properties.splice(primitivePropIndex + 1, 0, foundMeta);
                }
                this.ensurePropertyMetaData(primitiveProp._properties || []);
            }
        }
        else {
            for (let i = 0; i < this.parsedStructureDefinitions.length; i++) {
                const parsedProfile = this.parsedStructureDefinitions[i];
                this.ensurePropertyMetaData(parsedProfile._properties);
            }
        }
    }
    sortValueSetDependencies(valueSets) {
        const ret = [];
        function addValueSet(valueSetUrl) {
            const foundValueSet = _.find(valueSets, (nextValueSet) => {
                return nextValueSet.url === valueSetUrl;
            });
            if (!foundValueSet) {
                return;
            }
            if (foundValueSet.compose) {
                _.each(foundValueSet.compose.include, (include) => {
                    addValueSet(include.valueSet);
                });
            }
            if (ret.indexOf(foundValueSet) < 0) {
                ret.push(foundValueSet);
            }
        }
        _.each(valueSets, (valueSet) => {
            addValueSet(valueSet.url);
        });
        return ret;
    }
    loadCodeSystem(codeSystem) {
        if (!codeSystem) {
            return;
        }
        const foundCodeSystem = _.find(this.codeSystems, (nextCodeSystem) => {
            return nextCodeSystem.url === codeSystem.url || nextCodeSystem.id === codeSystem.id;
        });
        if (!foundCodeSystem) {
            this.codeSystems.push(codeSystem);
        }
    }
    ;
    parseBundle(bundle) {
        if (!bundle || !bundle.entry) {
            return;
        }
        _.chain(bundle.entry)
            .filter((entry) => {
            return entry.resource.resourceType === 'CodeSystem';
        })
            .each((entry) => {
            this.loadCodeSystem(entry.resource);
        });
        let valueSets = _.chain(bundle.entry)
            .filter((entry) => {
            return entry.resource.resourceType === 'ValueSet';
        })
            .map((entry) => {
            return entry.resource;
        })
            .value();
        valueSets = this.sortValueSetDependencies(valueSets);
        _.each(valueSets, (valueSet) => {
            this.parseValueSet(valueSet);
        });
        _.chain(bundle.entry)
            .filter((entry) => {
            if (entry.resource.resourceType !== 'StructureDefinition') {
                return false;
            }
            const resource = entry.resource;
            return !(resource.kind != 'resource' && resource.kind != 'complex-type' && resource.kind != 'primitive-type');
        })
            .each((entry) => {
            this.parseStructureDefinition(entry.resource);
        });
    }
    parseStructureDefinition(structureDefinition) {
        const uid = ("0000" + ((Math.random() * Math.pow(36, 4)) | 0).toString(36)).slice(-4);
        const parsedStructureDefinition = {
            _url: structureDefinition.url,
            _type: 'Resource',
            _kind: structureDefinition.kind,
            _properties: []
        };
        this.parsedStructureDefinitions[structureDefinition.id || uid] = parsedStructureDefinition;
        const loadedStructureDefinition = _.find(this.structureDefinitions, (sd) => sd.url === structureDefinition.url);
        if (!loadedStructureDefinition) {
            this.structureDefinitions.push(structureDefinition);
        }
        if (structureDefinition.snapshot && structureDefinition.snapshot.element) {
            for (let x in structureDefinition.snapshot.element) {
                const element = structureDefinition.snapshot.element[x];
                let elementId = structureDefinition.snapshot.element[x].id;
                elementId = elementId.substring(structureDefinition.id.length + 1);
                if (!element.max) {
                    throw 'Expected all base resource elements to have a max value';
                }
                if (!elementId || elementId.indexOf('.') > 0 || !element.type) {
                    continue;
                }
                if (element.type.length === 1) {
                    const newProperty = {
                        _name: elementId,
                        _type: element.type[0].code || 'string',
                        _multiple: element.max !== '1',
                        _required: element.min === 1
                    };
                    parsedStructureDefinition._properties.push(newProperty);
                    this.populateValueSet(element, newProperty);
                    if (element.type[0].code == 'BackboneElement' || element.type[0].code == 'Element') {
                        newProperty._properties = [];
                        this.populateBackboneElement(parsedStructureDefinition, structureDefinition.snapshot.element[x].id, structureDefinition);
                    }
                }
                else if (elementId.endsWith('[x]')) {
                    elementId = elementId.substring(0, elementId.length - 3);
                    for (let y in element.type) {
                        let choiceType = element.type[y].code;
                        choiceType = choiceType.substring(0, 1).toUpperCase() + choiceType.substring(1);
                        const choiceElementId = elementId + choiceType;
                        const newProperty = {
                            _name: choiceElementId,
                            _choice: elementId,
                            _type: element.type[y].code,
                            _multiple: element.max !== '1',
                            _required: element.min === 1
                        };
                        this.populateValueSet(element, newProperty);
                        parsedStructureDefinition._properties.push(newProperty);
                    }
                }
                else {
                    let isReference = true;
                    for (let y in element.type) {
                        if (element.type[y].code !== 'Reference') {
                            isReference = false;
                            break;
                        }
                    }
                    if (isReference) {
                        parsedStructureDefinition._properties.push({
                            _name: elementId,
                            _type: 'Reference',
                            _multiple: element.max !== '1'
                        });
                    }
                    else {
                        console.log(elementId);
                    }
                }
            }
        }
        this.ensurePropertyMetaData(parsedStructureDefinition._properties);
        return parsedStructureDefinition;
    }
    parseValueSet(valueSet) {
        const newValueSet = {
            systems: []
        };
        if (valueSet.expansion && valueSet.expansion.contains) {
            for (let i = 0; i < valueSet.expansion.contains.length; i++) {
                const contains = valueSet.expansion.contains[i];
                if (contains.inactive || contains.abstract) {
                    continue;
                }
                let foundSystem = _.find(newValueSet.systems, (system) => {
                    return system.uri === contains.system;
                });
                if (!foundSystem) {
                    foundSystem = {
                        uri: contains.system,
                        codes: []
                    };
                    newValueSet.systems.push(foundSystem);
                }
                foundSystem.codes.push({
                    code: contains.code,
                    display: contains.display
                });
            }
        }
        else if (valueSet.compose) {
            for (let i = 0; i < valueSet.compose.include.length; i++) {
                const include = valueSet.compose.include[i];
                if (include.system) {
                    let foundSystem = _.find(newValueSet.systems, (system) => {
                        return system.uri === include.system;
                    });
                    if (!foundSystem) {
                        foundSystem = {
                            uri: include.system,
                            codes: []
                        };
                        newValueSet.systems.push(foundSystem);
                    }
                    const foundCodeSystem = _.find(this.codeSystems, (codeSystem) => {
                        return codeSystem.url === include.system;
                    });
                    if (foundCodeSystem) {
                        const codes = _.map(foundCodeSystem.concept, (concept) => {
                            return {
                                code: concept.code,
                                display: concept.display
                            };
                        });
                        foundSystem.codes = foundSystem.codes.concat(codes);
                    }
                }
                if (include.valueSet) {
                    const includeValueSet = this.parsedValueSets[include.valueSet];
                    if (includeValueSet) {
                        _.each(includeValueSet.systems, (includeSystem) => {
                            const foundSystem = _.find(newValueSet.systems, (nextSystem) => {
                                return nextSystem.uri === includeSystem.uri;
                            });
                            if (!foundSystem) {
                                newValueSet.systems.push({
                                    uri: includeSystem.uri,
                                    codes: [].concat(includeSystem.codes)
                                });
                            }
                            else {
                                foundSystem.codes = foundSystem.codes.concat(includeSystem.codes);
                            }
                        });
                    }
                }
                if (include.concept) {
                    const systemUri = include.system || '';
                    let foundSystem = _.find(newValueSet.systems, (nextSystem) => {
                        return nextSystem.uri === systemUri;
                    });
                    if (!foundSystem) {
                        foundSystem = {
                            uri: systemUri,
                            codes: []
                        };
                        newValueSet.systems.push(foundSystem);
                    }
                    const codes = _.map(include.concept, (concept) => {
                        return {
                            code: concept.code,
                            display: concept.display
                        };
                    });
                    foundSystem.codes = foundSystem.codes.concat(codes);
                }
            }
        }
        const systemsWithCodes = _.filter(newValueSet.systems, (system) => {
            return system.codes && system.codes.length > 0;
        });
        if (systemsWithCodes.length > 0) {
            this.parsedValueSets[valueSet.url] = newValueSet;
            return newValueSet;
        }
    }
    populateValueSet(element, property) {
        if (element.binding) {
            const binding = element.binding;
            if (binding.strength) {
                property._valueSetStrength = binding.strength;
            }
            if (this.version === fhir_1.Versions.R4 && binding.valueSet) {
                property._valueSet = binding.valueSet;
            }
            else if (this.version === fhir_1.Versions.STU3 && binding.valueSetReference && binding.valueSetReference.reference) {
                property._valueSet = binding.valueSetReference.reference;
            }
        }
    }
    populateBackboneElement(resourceType, parentElementId, profile) {
        for (let y in profile.snapshot.element) {
            const backboneElement = profile.snapshot.element[y];
            let backboneElementId = backboneElement.id;
            if (!backboneElementId.startsWith(parentElementId + '.') || backboneElementId.split('.').length !== parentElementId.split('.').length + 1) {
                continue;
            }
            backboneElementId = backboneElementId.substring(profile.id.length + 1);
            const parentElementIdSplit = parentElementId.substring(profile.id.length + 1).split('.');
            let parentBackboneElement = null;
            for (let j = 0; j < parentElementIdSplit.length; j++) {
                parentBackboneElement = _.find(!parentBackboneElement ? resourceType._properties : parentBackboneElement._properties, (property) => {
                    return property._name == parentElementIdSplit[j];
                });
                if (!parentBackboneElement) {
                    throw 'Parent backbone element not found';
                }
            }
            if (parentBackboneElement) {
                if (!backboneElement.type) {
                    let type = 'string';
                    if (backboneElement.contentReference) {
                        type = backboneElement.contentReference;
                    }
                    parentBackboneElement._properties.push({
                        _name: backboneElementId.substring(backboneElementId.lastIndexOf('.') + 1),
                        _type: type,
                        _multiple: backboneElement.max !== '1',
                        _required: backboneElement.min === 1
                    });
                }
                else if (backboneElement.type.length == 1) {
                    const newProperty = {
                        _name: backboneElementId.substring(backboneElementId.lastIndexOf('.') + 1),
                        _type: backboneElement.type[0].code,
                        _multiple: backboneElement.max !== '1',
                        _required: backboneElement.min === 1,
                        _properties: []
                    };
                    parentBackboneElement._properties.push(newProperty);
                    this.populateValueSet(backboneElement, newProperty);
                    if (backboneElement.type[0].code === 'BackboneElement' || backboneElement.type[0].code == 'Element') {
                        this.populateBackboneElement(resourceType, profile.snapshot.element[y].id, profile);
                    }
                }
                else if (backboneElement.id.endsWith('[x]')) {
                    for (let y in backboneElement.type) {
                        let choiceType = backboneElement.type[y].code;
                        choiceType = choiceType.substring(0, 1).toUpperCase() + choiceType.substring(1);
                        const choiceElementId = backboneElement.id.substring(backboneElement.id.lastIndexOf('.') + 1, backboneElement.id.length - 3) + choiceType;
                        const newProperty = {
                            _name: choiceElementId,
                            _choice: backboneElement.id.substring(backboneElement.id.lastIndexOf('.') + 1),
                            _type: backboneElement.type[y].code,
                            _multiple: backboneElement.max !== '1',
                            _required: backboneElement.min === 1
                        };
                        parentBackboneElement._properties.push(newProperty);
                        this.populateValueSet(backboneElement, newProperty);
                    }
                }
                else {
                    let isReference = true;
                    for (let z in backboneElement.type) {
                        if (backboneElement.type[z].code !== 'Reference') {
                            isReference = false;
                            break;
                        }
                    }
                    if (!isReference) {
                        throw 'Did not find a reference... not sure what to do';
                    }
                    let newProperty = {
                        _name: backboneElementId.substring(backboneElementId.lastIndexOf('.') + 1),
                        _type: 'Reference',
                        _multiple: backboneElement.max !== '1',
                        _required: backboneElement.min === 1
                    };
                    parentBackboneElement._properties.push(newProperty);
                    this.populateValueSet(backboneElement, newProperty);
                }
            }
            else {
                throw 'Unexpected backbone parent element id';
            }
        }
    }
}
exports.ParseConformance = ParseConformance;
//# sourceMappingURL=parseConformance.js.map