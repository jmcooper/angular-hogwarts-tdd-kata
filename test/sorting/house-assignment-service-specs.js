"use strict";

describe('HouseAssignmentService', function () {
    var houseAssignmentService,
        mockWizardRepository,
        mockHouseRepository,
        mockRandomNumberService;

    beforeEach(function () {
        module("hogwartsApp");

        inject(function (HouseAssignmentService, WizardRepository, HouseRepository, RandomNumberService) {
            houseAssignmentService = HouseAssignmentService;
            mockWizardRepository = sinon.stub(WizardRepository);
            mockHouseRepository = sinon.stub(HouseRepository);	
            mockRandomNumberService = sinon.stub(RandomNumberService);
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

            response = houseAssignmentService.assignWizard();
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
