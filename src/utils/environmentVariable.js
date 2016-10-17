export class EnvironmentVariableHelper {
    /**
     * @param {Service} service
     * @param {Array<EnvironmentVariable>} globalEnvs
     */
    static replaceEnvWithGlobalEnv(service, globalEnvs) {
        const envVars = service.getEnvironmentVariables().map(e => {
            let value = e.getValue();
            if(typeof value === 'string' && value.indexOf("$") === 0) {
                const globalEnv = (globalEnvs || []).find(e => e.getKey() === value.substr(1));
                if(globalEnv) {
                    e.setValue(globalEnv.getValue());
                }
            }
            return e;
        });
        service.setEnvironmentVariables(envVars);
    }
}
