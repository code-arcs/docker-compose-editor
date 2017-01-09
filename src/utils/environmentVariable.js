import {EnvironmentVariable} from "../domain/environmentVariable";
import lodash from "lodash";

export class EnvironmentVariableHelper {
    /**
     * Replaces variable references in the environment variables of a service by their concrete value of global
     * environment variable.
     *
     * @param {Service} service
     * @param {Array<EnvironmentVariable>} globalEnvs
     */
    static replaceEnvWithGlobalEnv(service, globalEnvs) {
        globalEnvs = EnvironmentVariableHelper._resolveVarsInGlobalEnv(globalEnvs);
        service = lodash.cloneDeep(service);
        const serviceEnvVars = service.getEnvironmentVariables();
        const envVars = (serviceEnvVars || []).map(EnvironmentVariableHelper._replaceVarsCallback(globalEnvs));
        service.setEnvironmentVariables(envVars);
        return service;
    }

    /**
     * Replaces all variables of global environment variables with their respective concrete values.
     *
     * @param   {Array<EnvironmentVariable>} globalEnvs
     * @returns {Array<EnvironmentVariable>} replaced global environment variables
     * @private
     */
    static _resolveVarsInGlobalEnv(globalEnvs) {
        globalEnvs = lodash.cloneDeep(globalEnvs);
        // FIXME: This is ugly as fuck... We continue replacing until no "$" is found in the values....
        // Don't kill me please! We need to build a tree here which is used to resolve vars.
        while((globalEnvs || []).map(e => e.getValue()).some(v => v.indexOf("$") !== -1)) {
            globalEnvs = (globalEnvs || []).map(EnvironmentVariableHelper._replaceVarsCallback(globalEnvs));
        }
        return globalEnvs;
    }

    /**
     * This is private property!
     *
     * This function is used to replace the variables of type $ABC.. etc.
     *
     * @param   {Array<EnvironmentVariable>}globalEnvs
     * @returns {Function} callback used by Array.map function
     * @private
     */
    static _replaceVarsCallback(globalEnvs) {
        const regexForVariables = /\$([A-Z_]*)/gi;

        return function (e) {
            let value = e.getValue();
            if (typeof value === 'string' && value.indexOf("$") !== -1) {
                value = value.replace(regexForVariables, match => {
                    const envVar = globalEnvs.find(env => env.getKey() === match.substr(1));
                    return envVar ? envVar.getValue() : match;
                });

                return EnvironmentVariable.create(e.getKey(), value);
            }
            return e;
        }
    }
}
