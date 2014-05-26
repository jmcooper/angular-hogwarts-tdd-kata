"use strict";

describe('HouseAssignmentService', function () {
    var houseAssignmentService, mockWizardRepository, mockHouseRepository;
	
    beforeEach(function () {
        module("hogwartsApp");

        inject(function (HouseAssignmentService, WizardRepository, HouseRepository) {
            houseAssignmentService = HouseAssignmentService;            
            mockWizardRepository = sinon.stub(WizardRepository); 
			mockHouseRepository = sinon.stub(HouseRepository);			
        });
    });

    describe('when assigning a wizard to a house', function () { 
		var wizard = {house:""};
		var houseOptions = ['one', 'two', 'three', 'four'];	
		
        beforeEach(function() {            
            mockWizardRepository.get.returns(wizard);
			mockHouseRepository.get.returns(houseOptions);
			
			houseAssignmentService.assignWizard();
        });
        it('should get the wizard from the repository', function () {
            expect(mockWizardRepository.get.called).toBeTruthy();
        });     
		it('should get the house options from the repository', function() {
            expect(mockHouseRepository.get.called).toBeTruthy();
        }); 		
    });    
});
