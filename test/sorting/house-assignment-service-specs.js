"use strict";

describe('HouseAssignmentService', function () {
    var houseAssignmentSvc,
        mockWizardRepository,
        mockHouseRepository,
        mockRandomNumberService;

    beforeEach(function () {
        module("hogwartsApp");

        inject(function (houseAssignmentService, wizardRepository, houseRepository, randomNumberService) {
            houseAssignmentSvc = houseAssignmentService;
            mockWizardRepository = sinon.stub(wizardRepository);
            mockHouseRepository = sinon.stub(houseRepository);
            mockRandomNumberService = sinon.stub(randomNumberService);
        });
    });

    describe('when assigning a wizard to a house', function () {
        var wizard = {house:""};
        var houseOptions = ['one', 'two', 'three', 'four'];	
        var houseNumber = 3;
        var selectedHouseOption = houseOptions[houseNumber];
        var response;

        beforeEach(function() {
            mockWizardRepository.get.returns(wizard);
            mockHouseRepository.get.returns(houseOptions);
            mockRandomNumberService.getInRange.returns(houseNumber);

            response = houseAssignmentSvc.assignWizard();
        });

        it('gets the wizard from the repository', function () {
            sinon.assert.calledOnce(mockWizardRepository.get);
        });

        it('gets the house options from the repository', function() {
            sinon.assert.calledOnce(mockHouseRepository.get);
        });	

        it('gets a random number for house options', function() {
            sinon.assert.calledWith(mockRandomNumberService.getInRange, 0, houseOptions.length - 1);
        });

        it('saves the wizard', function(){
          sinon.assert.calledWith(mockWizardRepository.save, {house: selectedHouseOption});
        });

        it('returns the name of the house', function () {
          expect(response).toEqual(selectedHouseOption);
        });
    });
});
