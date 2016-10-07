export const RestartPolicy = {};
RestartPolicy.NO = "no";
RestartPolicy.ON_FAILURE = "on-failure";
RestartPolicy.ALWAYS = "always";
RestartPolicy.UNLESS_STOPPED = "unless-stopped";

/**
 * @param key
 * @returns {string}
 */
RestartPolicy.get = function (key) {
    let value = RestartPolicy[key];
    if (!value) {
        for (let a in RestartPolicy) {
            const policy = RestartPolicy[a];
            if (typeof policy === 'string' && key === policy) {
                value = policy;
                break;
            }
        }
    }

    return value || RestartPolicy.NO;
};
