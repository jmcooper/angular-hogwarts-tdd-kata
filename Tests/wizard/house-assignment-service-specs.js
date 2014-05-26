"use strict";

describe('HouseAssignmentService', function () {
    var houseAssignmentService, mockWizardRepository, mockHouseRepository, mockRandomNumberService;
	
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
		var houseNumber = 1;
		var selectedHouseOption = houseOptions[houseNumber];
		
        beforeEach(function() {            
            mockWizardRepository.get.returns(wizard);
			mockHouseRepository.get.returns(houseOptions);
			mockRandomNumberService.getInRange.returns(houseNumber);
			
			houseAssignmentService.assignWizard();
        });
        it('should get the wizard from the repository', function () {
            expect(mockWizardRepository.get.called).toBeTruthy();
        });     
		it('should get the house options from the repository', function() {
            expect(mockHouseRepository.get.called).toBeTruthy();
        }); 	
		it('should get a random number for house options', function() {
            expect(mockRandomNumberService.getInRange.calledWith(0, houseOptions.length - 1)).toBeTruthy();
        });			
		it('should save the wizard', function(){
			expect(mockWizardRepository.save.calledWith({house: selectedHouseOption})).toBeTruthy();
		});
    });    
});
