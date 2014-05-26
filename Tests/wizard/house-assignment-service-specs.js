"use strict";

describe('HouseAssignmentService', function () {
    var houseAssignmentService, mockWizardRepository;	
	
    beforeEach(function () {
        module("hogwartsApp");

        inject(function (HouseAssignmentService, WizardRepository) {
            houseAssignmentService = HouseAssignmentService;            
            mockWizardRepository = sinon.stub(WizardRepository);           
        });
    });

    describe('when assigning a wizard to a house', function () { 
		var wizard = {house:""};
		
        beforeEach(function() {            
            mockWizardRepository.get.returns(wizard);
			houseAssignmentService.assignWizard();
        });
        it('should get the wizard from the repository', function () {
            expect(mockWizardRepository.get.called).toBeTruthy();
        });       
    });    
});
