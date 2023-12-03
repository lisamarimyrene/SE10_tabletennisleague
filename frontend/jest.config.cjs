module.exports = async () => {
    return {
        verbose: true,
        testEnvironment: 'jest-environment-jsdom',
        moduleNameMapper: {
            '\\.css$': '<rootDir>/__mocks__/styleMock.js',
        },
    };
};