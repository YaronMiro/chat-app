const FactoryController = (router, basePath, controllerClass) => {

    console.log("basePath", basePath);

    let inValidData = false;
  
    if (typeof basePath !== 'string') {
        console.log(`basePath must be a string`);
        inValidData = true;
    }

    const sanitizeBasePath = basePath.trim();
    const hasPrefixSlash = sanitizeBasePath.startsWith('/');

    if (!hasPrefixSlash) {
        console.log(`basePath must begin with a slash`)
        inValidData = true;
    }

    return inValidData ? null : new controllerClass(router, sanitizeBasePath);

}

module.exports = FactoryController;